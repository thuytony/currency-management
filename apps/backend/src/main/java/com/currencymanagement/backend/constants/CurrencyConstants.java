package com.currencymanagement.backend.constants;

import java.util.Map;
import java.util.HashMap;

public class CurrencyConstants {
    public static final String DEFAULT_CURRENCY = "USD";
    
    public static final Map<String, String> CURRENCY_SYMBOLS = new HashMap<>();
    
    static {
        CURRENCY_SYMBOLS.put("USD", "$");
        CURRENCY_SYMBOLS.put("EUR", "€");
        CURRENCY_SYMBOLS.put("JPY", "¥");
        CURRENCY_SYMBOLS.put("GBP", "£");
        CURRENCY_SYMBOLS.put("AUD", "A$");
        CURRENCY_SYMBOLS.put("CAD", "C$");
        CURRENCY_SYMBOLS.put("CHF", "CHF");
        CURRENCY_SYMBOLS.put("CNY", "¥");
        CURRENCY_SYMBOLS.put("KRW", "₩");
        CURRENCY_SYMBOLS.put("INR", "₹");
        CURRENCY_SYMBOLS.put("VND", "₫");
    }
    
    private CurrencyConstants() {
        // Private constructor to prevent instantiation
    }
} 