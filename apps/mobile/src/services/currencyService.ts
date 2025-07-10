import axios from 'axios';
import { Currency, PagedResponse, PaginationParams } from '../types';
import { API_ENDPOINTS } from '../constants';

// For development, use your local machine's IP address
// Replace with actual backend URL in production
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const currencyService = {
  getAllCurrencies: async (): Promise<Currency[]> => {
    try {
      const response = await api.get<Currency[]>(API_ENDPOINTS.CURRENCIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  },

  getCurrenciesPaged: async (params: PaginationParams = {}): Promise<PagedResponse<Currency>> => {
    try {
      const {
        page = 0,
        size = 10,
        sortBy = 'code',
        sortDir = 'asc'
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDir
      });

      const response = await api.get<PagedResponse<Currency>>(
        `${API_ENDPOINTS.CURRENCIES}/paged?${queryParams}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies paged:', error);
      throw error;
    }
  },

  getCurrencyByCode: async (code: string): Promise<Currency> => {
    try {
      const response = await api.get<Currency>(`${API_ENDPOINTS.CURRENCIES}/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching currency by code:', error);
      throw error;
    }
  },
}; 