package com.currencymanagement.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Schema(description = "Dữ liệu đầu vào để cập nhật tiền tệ")
public class UpdateCurrencyRequest {
    
    @NotBlank(message = "Mã tiền tệ không được để trống")
    @Size(min = 3, max = 3, message = "Mã tiền tệ phải có đúng 3 ký tự")
    @Schema(description = "Mã tiền tệ theo chuẩn ISO 4217", example = "EUR", required = true)
    private String code;
    
    @NotBlank(message = "Tên tiền tệ không được để trống")
    @Size(max = 100, message = "Tên tiền tệ không được quá 100 ký tự")
    @Schema(description = "Tên đầy đủ của tiền tệ", example = "Euro", required = true)
    private String name;
    
    @NotBlank(message = "Ký hiệu tiền tệ không được để trống")
    @Size(max = 10, message = "Ký hiệu tiền tệ không được quá 10 ký tự")
    @Schema(description = "Ký hiệu tiền tệ", example = "€", required = true)
    private String symbol;
    
    @NotNull(message = "Tỷ giá hối đoái không được để trống")
    @Schema(description = "Tỷ giá hối đoái so với USD", example = "0.8500", required = true)
    private BigDecimal exchangeRate;
    
    // Constructors
    public UpdateCurrencyRequest() {}
    
    public UpdateCurrencyRequest(String code, String name, String symbol, BigDecimal exchangeRate) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
        this.exchangeRate = exchangeRate;
    }
    
    // Getters and Setters
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSymbol() {
        return symbol;
    }
    
    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
    
    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }
    
    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }
} 