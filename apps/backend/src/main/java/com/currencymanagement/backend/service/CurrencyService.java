package com.currencymanagement.backend.service;

import com.currencymanagement.backend.entity.Currency;
import com.currencymanagement.backend.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyService {
    
    @Autowired
    private CurrencyRepository currencyRepository;
    
    public List<Currency> getAllCurrencies() {
        return currencyRepository.findAll();
    }
    
    public Page<Currency> getAllCurrencies(Pageable pageable) {
        return currencyRepository.findAll(pageable);
    }
    
    public Optional<Currency> getCurrencyByCode(String code) {
        return currencyRepository.findByCode(code);
    }
    
    public Optional<Currency> getCurrencyById(Long id) {
        return currencyRepository.findById(id);
    }
    
    public Currency saveCurrency(Currency currency) {
        return currencyRepository.save(currency);
    }
    
    public boolean existsByCode(String code) {
        return currencyRepository.existsByCode(code);
    }
    
    public void deleteCurrency(Long id) {
        currencyRepository.deleteById(id);
    }
} 