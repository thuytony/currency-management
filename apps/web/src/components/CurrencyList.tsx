import { useState, useEffect } from 'react';
import { Currency, PagedResponse, PaginationParams } from '../types';
import { currencyService } from '../services/currencyService';

const CurrencyList: React.FC = () => {
  const [pagedResponse, setPagedResponse] = useState<PagedResponse<Currency> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [columnsCount, setColumnsCount] = useState(3);

  // Calculate page size based on viewport to ensure consistent user experience
  const getOptimalPageSize = () => {
    const width = window.innerWidth;
    let columns = 3;
    
    if (width < 769) columns = 1;        // Mobile: 1 column
    else if (width < 1025) columns = 2;  // Tablet: 2 columns
    else if (width < 1400) columns = 3;  // Desktop: 3 columns
    else columns = 4;                    // Large screen: 4 columns
    
    // Create 3-4 rows for consistent visual experience
    const optimalRows = 3;
    return columns * optimalRows;
  };

  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    size: getOptimalPageSize(),
    sortBy: 'code',
    sortDir: 'asc'
  });

  // Handle window resize to update display only (no API call)
  useEffect(() => {
    const handleResize = () => {
      const newSize = getOptimalPageSize();
      const newColumns = newSize <= 3 ? 1 : newSize <= 6 ? 2 : newSize <= 12 ? 3 : 4;
      
      setColumnsCount(newColumns);
      // Only update columnsCount for display, don't change params to avoid API call
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch currencies when component mounts and when pagination params change
  useEffect(() => {
    fetchCurrencies();
  }, [params]);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const data = await currencyService.getCurrenciesPaged(params);
      setPagedResponse(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tiền tệ');
      console.error('Error fetching currencies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  const handleSizeChange = (newSize: number) => {
    setParams(prev => ({ ...prev, size: newSize, page: 0 }));
  };

  const handleSortChange = (sortBy: string, sortDir: 'asc' | 'desc') => {
    setParams(prev => ({ ...prev, sortBy, sortDir, page: 0 }));
  };

  // Generate smart page size options based on columns
  const getPageSizeOptions = () => {
    const baseOptions = [1, 2, 3, 4, 5, 6]; // Number of rows
    return baseOptions.map(rows => ({
      value: rows * columnsCount,
      label: `${rows} hàng (${rows * columnsCount} items)`
    }));
  };

  const renderPaginationControls = () => {
    if (!pagedResponse) return null;

    const { page, totalPages, first, last } = pagedResponse;
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    return (
      <div className="pagination-controls">
        <div className="pagination-info">
          <span>
            Trang {page + 1} trên {totalPages} 
            ({pagedResponse.totalElements} tổng cộng)
          </span>
        </div>
        
        <div className="pagination-buttons">
          <button 
            onClick={() => handlePageChange(page - 1)}
            disabled={first}
            className="pagination-btn"
          >
            « Trước
          </button>
          
          {pages.map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
            >
              {pageNum + 1}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(page + 1)}
            disabled={last}
            className="pagination-btn"
          >
            Sau »
          </button>
        </div>
      </div>
    );
  };

  const renderCurrencyGrid = () => {
    if (!pagedResponse?.content) return null;
    
    return (
      <div className="currency-grid">
        {pagedResponse.content.map((currency: Currency) => (
          <div key={currency.code} className="currency-card">
            <div className="currency-header">
              <span className="currency-symbol">{currency.symbol}</span>
              <span className="currency-code">{currency.code}</span>
            </div>
            <h3 className="currency-name">{currency.name}</h3>
            <div className="exchange-rate">
              <span className="rate-label">Tỷ giá:</span>
              <span className="rate-value">{currency.exchangeRate}</span>
            </div>
            <div className="currency-dates">
              <small>Tạo: {new Date(currency.createdAt).toLocaleDateString('vi-VN')}</small>
              <small>Cập nhật: {new Date(currency.updatedAt).toLocaleDateString('vi-VN')}</small>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Đang tải danh sách tiền tệ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchCurrencies} className="retry-btn">
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="currency-list">
      <h2>Danh sách tiền tệ</h2>
      
      {/* Controls */}
      <div className="currency-controls">
        <div className="page-size-control">
          <label htmlFor="pageSize">Số hàng mỗi trang:</label>
          <select 
            id="pageSize"
            value={params.size} 
            onChange={(e) => handleSizeChange(Number(e.target.value))}
          >
            {getPageSizeOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="sort-control">
          <label htmlFor="sortBy">Sắp xếp theo:</label>
          <select 
            id="sortBy"
            value={params.sortBy} 
            onChange={(e) => handleSortChange(e.target.value, params.sortDir || 'asc')}
          >
            <option value="code">Mã tiền tệ</option>
            <option value="name">Tên</option>
            <option value="exchangeRate">Tỷ giá</option>
            <option value="createdAt">Ngày tạo</option>
          </select>
          
          <select 
            value={params.sortDir} 
            onChange={(e) => handleSortChange(params.sortBy || 'code', e.target.value as 'asc' | 'desc')}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {/* Currency Grid */}
      {renderCurrencyGrid()}

      {/* Pagination Controls */}
      {renderPaginationControls()}
    </div>
  );
};

export default CurrencyList; 