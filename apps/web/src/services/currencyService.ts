import axios from 'axios';
import { Currency, PagedResponse, PaginationParams } from '../types';
import { API_ENDPOINTS } from '../constants';

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
    const response = await api.get<Currency[]>(API_ENDPOINTS.CURRENCIES);
    return response.data;
  },

  getCurrenciesPaged: async (params: PaginationParams = {}): Promise<PagedResponse<Currency>> => {
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
  },

  getCurrencyByCode: async (code: string): Promise<Currency> => {
    const response = await api.get<Currency>(`${API_ENDPOINTS.CURRENCIES}/${code}`);
    return response.data;
  },

  createCurrency: async (currency: Omit<Currency, 'id'>): Promise<Currency> => {
    const response = await api.post<Currency>(API_ENDPOINTS.CURRENCIES, currency);
    return response.data;
  },

  updateCurrency: async (id: number, currency: Currency): Promise<Currency> => {
    const response = await api.put<Currency>(`${API_ENDPOINTS.CURRENCIES}/${id}`, currency);
    return response.data;
  },

  deleteCurrency: async (id: number): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.CURRENCIES}/${id}`);
  },
}; 