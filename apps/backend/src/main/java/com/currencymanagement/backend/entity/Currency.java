package com.currencymanagement.backend.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "currencies")
@Schema(description = "Thông tin tiền tệ")
public class Currency {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID duy nhất của tiền tệ", example = "1")
    private Long id;
    
    @Column(name = "code", unique = true, nullable = false, length = 3)
    @Schema(description = "Mã tiền tệ theo chuẩn ISO 4217", example = "USD", required = true)
    private String code;
    
    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Tên đầy đủ của tiền tệ", example = "US Dollar", required = true)
    private String name;
    
    @Column(name = "symbol", nullable = false, length = 10)
    @Schema(description = "Ký hiệu tiền tệ", example = "$", required = true)
    private String symbol;
    
    @Column(name = "exchange_rate", nullable = false, precision = 10, scale = 4)
    @Schema(description = "Tỷ giá hối đoái so với USD", example = "1.0000", required = true)
    private BigDecimal exchangeRate;
    
    @Column(name = "created_at")
    @Schema(description = "Thời gian tạo", example = "2023-12-01T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Thời gian cập nhật cuối cùng", example = "2023-12-01T10:30:00")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Currency() {}
    
    public Currency(String code, String name, String symbol, BigDecimal exchangeRate) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
        this.exchangeRate = exchangeRate;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 