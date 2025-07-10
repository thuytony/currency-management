import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Currency, PagedResponse, PaginationParams } from '../types';
import { currencyService } from '../services/currencyService';

const CurrencyList: React.FC = () => {
  const [pagedResponse, setPagedResponse] = useState<PagedResponse<Currency> | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
    sortBy: 'code',
    sortDir: 'asc'
  });

  useEffect(() => {
    fetchCurrencies(true);
  }, [params.size, params.sortBy, params.sortDir]);

  const fetchCurrencies = async (reset: boolean = false, pageOverride?: number) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrencies([]);
      } else {
        setLoadingMore(true);
      }

      const currentPage = pageOverride ?? (reset ? 0 : (params.page ?? 0));
      const data = await currencyService.getCurrenciesPaged({
        ...params,
        page: currentPage
      });
      
      setPagedResponse(data);
      
      if (reset) {
        setCurrencies(data.content);
      } else {
        setCurrencies(prev => [...prev, ...data.content]);
      }
      
      setParams(prev => ({ ...prev, page: currentPage }));
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tiền tệ');
      console.error('Error fetching currencies:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCurrencies(true, 0);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (pagedResponse && !pagedResponse.last && !loadingMore) {
      const nextPage = (params.page ?? 0) + 1;
      fetchCurrencies(false, nextPage);
    }
  };

  const handleSizeChange = (newSize: number) => {
    setParams(prev => ({ ...prev, size: newSize, page: 0 }));
  };

  const handleSortChange = (sortBy: string, sortDir: 'asc' | 'desc') => {
    setParams(prev => ({ ...prev, sortBy, sortDir, page: 0 }));
  };

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <View style={styles.currencyCard}>
      <View style={styles.currencyHeader}>
        <Text style={styles.currencySymbol}>{item.symbol}</Text>
        <View style={styles.currencyCode}>
          <Text style={styles.currencyCodeText}>{item.code}</Text>
        </View>
      </View>
      <Text style={styles.currencyName}>{item.name}</Text>
      <View style={styles.exchangeRate}>
        <Text style={styles.rateLabel}>Tỷ giá:</Text>
        <Text style={styles.rateValue}>{item.exchangeRate}</Text>
      </View>
      <View style={styles.currencyDates}>
        <Text style={styles.dateText}>Tạo: {new Date(item.createdAt).toLocaleDateString('vi-VN')}</Text>
        <Text style={styles.dateText}>Cập nhật: {new Date(item.updatedAt).toLocaleDateString('vi-VN')}</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Đang tải danh sách tiền tệ...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => fetchCurrencies(true)} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const showSizeOptions = () => {
    Alert.alert(
      'Chọn số mục mỗi trang',
      '',
      [
        { text: '5', onPress: () => handleSizeChange(5) },
        { text: '10', onPress: () => handleSizeChange(10) },
        { text: '20', onPress: () => handleSizeChange(20) },
        { text: 'Hủy', style: 'cancel' }
      ]
    );
  };

  const showSortOptions = () => {
    Alert.alert(
      'Sắp xếp theo',
      '',
      [
        { text: 'Mã tiền tệ (A-Z)', onPress: () => handleSortChange('code', 'asc') },
        { text: 'Mã tiền tệ (Z-A)', onPress: () => handleSortChange('code', 'desc') },
        { text: 'Tên (A-Z)', onPress: () => handleSortChange('name', 'asc') },
        { text: 'Tên (Z-A)', onPress: () => handleSortChange('name', 'desc') },
        { text: 'Tỷ giá (Thấp-Cao)', onPress: () => handleSortChange('exchangeRate', 'asc') },
        { text: 'Tỷ giá (Cao-Thấp)', onPress: () => handleSortChange('exchangeRate', 'desc') },
        { text: 'Hủy', style: 'cancel' }
      ]
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={styles.loadingMoreText}>Đang tải thêm...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách tiền tệ</Text>
      
      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={showSizeOptions} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Số mục: {params.size}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={showSortOptions} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Sắp xếp</Text>
        </TouchableOpacity>
      </View>

      {/* Pagination Info */}
      {pagedResponse && (
        <View style={styles.paginationInfo}>
          <Text style={styles.paginationInfoText}>
            Trang {(pagedResponse.page || 0) + 1} / {pagedResponse.totalPages} 
            ({pagedResponse.totalElements} tổng cộng)
          </Text>
        </View>
      )}

      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        renderItem={renderCurrencyItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  currencyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
  },
  currencyCode: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currencyCodeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  currencyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  exchangeRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f2ff',
    padding: 12,
    borderRadius: 8,
  },
  rateLabel: {
    color: '#666',
    fontWeight: '500',
  },
  rateValue: {
    fontWeight: 'bold',
    color: '#667eea',
    fontSize: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  currencyDates: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f2ff',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 0.45,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  paginationInfo: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  paginationInfoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingMoreText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});

export default CurrencyList; 