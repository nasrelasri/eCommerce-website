import axios, { AxiosError } from 'axios';
import { Product } from '../products/mockData';

// API base URL - using relative path for Next.js API routes
const API_BASE_URL = '/api/products';

// Response type from our API
interface ApiResponse {
  success: boolean;
  data: Product[];
  count: number;
  timestamp: string;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

/**
 * Product Service - Handles all product-related API calls using axios
 */
export const productService = {
  /**
   * Fetch all products from the API
   * @returns Promise with array of products
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse>(API_BASE_URL);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Error fetching products:', axiosError.response?.data?.message || axiosError.message);
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch products');
      }
      throw error;
    }
  },

  /**
   * Fetch only trending products from the API
   * @returns Promise with array of trending products
   */
  async getTrendingProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse>(API_BASE_URL, {
        params: {
          trending: 'true'
        }
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Error fetching trending products:', axiosError.response?.data?.message || axiosError.message);
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch trending products');
      }
      throw error;
    }
  },

  /**
   * Fetch products filtered by category
   * @param category - Category name to filter by
   * @returns Promise with array of products in that category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse>(API_BASE_URL, {
        params: {
          category
        }
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Error fetching products by category:', axiosError.response?.data?.message || axiosError.message);
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch products by category');
      }
      throw error;
    }
  },

  /**
   * Search products by query string
   * @param query - Search query
   * @returns Promise with array of matching products
   */
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await axios.get<ApiResponse>(API_BASE_URL, {
        params: {
          search: query
        }
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error('Error searching products:', axiosError.response?.data?.message || axiosError.message);
        throw new Error(axiosError.response?.data?.message || 'Failed to search products');
      }
      throw error;
    }
  },

  /**
   * Fetch a single product by ID
   * @param id - Product ID
   * @returns Promise with the product or null if not found
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await axios.get<{ success: boolean; data: Product }>(`${API_BASE_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.status === 404) {
          return null;
        }
        console.error('Error fetching product:', axiosError.response?.data?.message || axiosError.message);
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch product');
      }
      throw error;
    }
  }
};

