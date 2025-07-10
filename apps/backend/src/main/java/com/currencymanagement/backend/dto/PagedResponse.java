package com.currencymanagement.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Response phân trang generic")
public class PagedResponse<T> {
    
    @Schema(description = "Danh sách dữ liệu trong trang hiện tại")
    private List<T> content;
    
    @Schema(description = "Số trang hiện tại (bắt đầu từ 0)", example = "0")
    private int page;
    
    @Schema(description = "Số lượng phần tử mỗi trang", example = "10")
    private int size;
    
    @Schema(description = "Tổng số phần tử", example = "100")
    private long totalElements;
    
    @Schema(description = "Tổng số trang", example = "10")
    private int totalPages;
    
    @Schema(description = "Có phải trang đầu tiên không", example = "true")
    private boolean first;
    
    @Schema(description = "Có phải trang cuối cùng không", example = "false")
    private boolean last;
    
    @Schema(description = "Số lượng phần tử trong trang hiện tại", example = "10")
    private int numberOfElements;
    
    @Schema(description = "Trang có rỗng không", example = "false")
    private boolean empty;
    
    // Constructors
    public PagedResponse() {}
    
    public PagedResponse(List<T> content, int page, int size, long totalElements, int totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = page == 0;
        this.last = page == totalPages - 1;
        this.numberOfElements = content.size();
        this.empty = content.isEmpty();
    }
    
    // Getters and Setters
    public List<T> getContent() {
        return content;
    }
    
    public void setContent(List<T> content) {
        this.content = content;
        this.numberOfElements = content != null ? content.size() : 0;
        this.empty = content == null || content.isEmpty();
    }
    
    public int getPage() {
        return page;
    }
    
    public void setPage(int page) {
        this.page = page;
        this.first = page == 0;
    }
    
    public int getSize() {
        return size;
    }
    
    public void setSize(int size) {
        this.size = size;
    }
    
    public long getTotalElements() {
        return totalElements;
    }
    
    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }
    
    public int getTotalPages() {
        return totalPages;
    }
    
    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
        this.last = this.page == totalPages - 1;
    }
    
    public boolean isFirst() {
        return first;
    }
    
    public void setFirst(boolean first) {
        this.first = first;
    }
    
    public boolean isLast() {
        return last;
    }
    
    public void setLast(boolean last) {
        this.last = last;
    }
    
    public int getNumberOfElements() {
        return numberOfElements;
    }
    
    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }
    
    public boolean isEmpty() {
        return empty;
    }
    
    public void setEmpty(boolean empty) {
        this.empty = empty;
    }
} 