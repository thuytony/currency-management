package com.currencymanagement.backend.controller;

import com.currencymanagement.backend.dto.CreateCurrencyRequest;
import com.currencymanagement.backend.dto.PagedResponse;
import com.currencymanagement.backend.dto.UpdateCurrencyRequest;
import com.currencymanagement.backend.entity.Currency;
import com.currencymanagement.backend.service.CurrencyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:19006"})
@Tag(name = "Currency Management", description = "API quản lý tỷ giá tiền tệ")
public class CurrencyController {
    
    @Autowired
    private CurrencyService currencyService;
    
    @GetMapping("/currencies")
    @Operation(summary = "Lấy danh sách tất cả tiền tệ", description = "Trả về danh sách tất cả các loại tiền tệ có trong hệ thống")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công - Trả về danh sách tiền tệ"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        List<Currency> currencies = currencyService.getAllCurrencies();
        return ResponseEntity.ok(currencies);
    }
    
    @GetMapping("/currencies/paged")
    @Operation(summary = "Lấy danh sách tiền tệ có phân trang", description = "Trả về danh sách tiền tệ với thông tin phân trang")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công - Trả về danh sách tiền tệ có phân trang"),
        @ApiResponse(responseCode = "400", description = "Tham số phân trang không hợp lệ"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<PagedResponse<Currency>> getCurrenciesPaged(
            @Parameter(description = "Số trang (bắt đầu từ 0)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Số lượng phần tử mỗi trang", example = "10")
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sắp xếp theo trường nào", example = "code")
            @RequestParam(defaultValue = "code") String sortBy,
            @Parameter(description = "Hướng sắp xếp (asc/desc)", example = "asc")
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        // Create Sort object
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        // Create Pageable instance
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Fetch paginated data
        Page<Currency> currencyPage = currencyService.getAllCurrencies(pageable);
        
        // Convert to PagedResponse
        PagedResponse<Currency> response = new PagedResponse<>(
            currencyPage.getContent(),
            currencyPage.getNumber(),
            currencyPage.getSize(),
            currencyPage.getTotalElements(),
            currencyPage.getTotalPages()
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/currencies/{code}")
    @Operation(summary = "Lấy tiền tệ theo mã", description = "Trả về thông tin chi tiết của một loại tiền tệ dựa trên mã tiền tệ")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công - Trả về thông tin tiền tệ"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy tiền tệ"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<Currency> getCurrencyByCode(
            @Parameter(description = "Mã tiền tệ (VD: USD, EUR, VND)", example = "USD") 
            @PathVariable String code) {
        Optional<Currency> currency = currencyService.getCurrencyByCode(code.toUpperCase());
        return currency.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/currencies")
    @Operation(summary = "Tạo tiền tệ mới", description = "Tạo một loại tiền tệ mới trong hệ thống")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công - Tiền tệ đã được tạo"),
        @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ hoặc mã tiền tệ đã tồn tại"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<Currency> createCurrency(
            @Parameter(description = "Thông tin tiền tệ mới cần tạo")
            @Valid @RequestBody CreateCurrencyRequest request) {
        if (currencyService.existsByCode(request.getCode().toUpperCase())) {
            return ResponseEntity.badRequest().build();
        }
        
        Currency currency = convertToEntity(request);
        Currency savedCurrency = currencyService.saveCurrency(currency);
        return ResponseEntity.ok(savedCurrency);
    }
    
    @PutMapping("/currencies/{id}")
    @Operation(summary = "Cập nhật tiền tệ", description = "Cập nhật thông tin của một loại tiền tệ đã tồn tại")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Thành công - Tiền tệ đã được cập nhật"),
        @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy tiền tệ"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<Currency> updateCurrency(
            @Parameter(description = "ID của tiền tệ cần cập nhật", example = "1")
            @PathVariable Long id,
            @Parameter(description = "Thông tin tiền tệ cần cập nhật")
            @Valid @RequestBody UpdateCurrencyRequest request) {
        
        // Check if currency exists
        Optional<Currency> existingCurrency = currencyService.getCurrencyById(id);
        if (existingCurrency.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Currency currency = convertToEntity(request, existingCurrency.get());
        Currency updatedCurrency = currencyService.saveCurrency(currency);
        return ResponseEntity.ok(updatedCurrency);
    }
    
    @DeleteMapping("/currencies/{id}")
    @Operation(summary = "Xóa tiền tệ", description = "Xóa một loại tiền tệ khỏi hệ thống")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Thành công - Tiền tệ đã được xóa"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy tiền tệ"),
        @ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    public ResponseEntity<Void> deleteCurrency(
            @Parameter(description = "ID của tiền tệ cần xóa", example = "1")
            @PathVariable Long id) {
        currencyService.deleteCurrency(id);
        return ResponseEntity.noContent().build();
    }
    
    // Helper methods to convert from DTO to Entity
    private Currency convertToEntity(CreateCurrencyRequest request) {
        Currency currency = new Currency();
        currency.setCode(request.getCode().toUpperCase());
        currency.setName(request.getName());
        currency.setSymbol(request.getSymbol());
        currency.setExchangeRate(request.getExchangeRate());
        
        // createdAt and updatedAt will be automatically set by @PrePersist
        return currency;
    }
    
    private Currency convertToEntity(UpdateCurrencyRequest request, Currency existingCurrency) {
        Currency currency = new Currency();
        currency.setId(existingCurrency.getId());
        currency.setCode(request.getCode().toUpperCase());
        currency.setName(request.getName());
        currency.setSymbol(request.getSymbol());
        currency.setExchangeRate(request.getExchangeRate());
        
        // createdAt remains unchanged, updatedAt will be automatically updated by @PreUpdate
        currency.setCreatedAt(existingCurrency.getCreatedAt());
        
        return currency;
    }
} 