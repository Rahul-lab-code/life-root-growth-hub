
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  disableToast?: boolean;
}

// This is a custom hook that we'll use for all API calls
export const useLiferootAPI = () => {
  const { currentUser } = useAuth();

  // Base URL for the API - would come from env in a real app
  const baseUrl = "/api"; // Replace with actual API URL in production

  /**
   * Make an API request to the backend
   * @param endpoint API endpoint to call, e.g., "/missions"
   * @param options Request options
   * @returns Promise that resolves to the API response
   */
  const apiRequest = async<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> => {
    const {
      method = 'GET',
      body,
      headers = {},
      disableToast = false
    } = options;

    // Prepare request headers - include auth token if user is logged in
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    if (currentUser) {
      // In a real app, you would include the auth token
      requestHeaders['Authorization'] = `Bearer ${localStorage.getItem('liferoot_token')}`;
    }

    // Create request config object
    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add request body if provided
    if (body) {
      requestConfig.body = JSON.stringify(body);
    }

    try {
      // Make the API request
      const response = await fetch(`${baseUrl}${endpoint}`, requestConfig);

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API request failed with status ${response.status}`
        );
      }

      // Parse and return response data
      return await response.json() as T;
    } catch (error) {
      // Show error toast unless disabled
      if (!disableToast) {
        toast("API Error", {
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          variant: "destructive",
        });
      }
      
      throw error;
    }
  };

  /**
   * Fetch data from the API using the GET method
   * For use in useEffect hooks throughout the application
   */
  const useFetch = <T>(
    endpoint: string,
    dependencies: any[] = [],
    options: Omit<FetchOptions, 'method'> = {}
  ) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      let isMounted = true;

      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const result = await apiRequest<T>(endpoint, {
            ...options,
            method: 'GET',
            disableToast: true
          });
          
          if (isMounted) {
            setData(result);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            
            if (!options.disableToast) {
              toast("Error fetching data", {
                description: err instanceof Error ? err.message : 'An unknown error occurred',
                variant: "destructive",
              });
            }
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      fetchData();

      // Cleanup function
      return () => {
        isMounted = false;
      };
    }, dependencies);

    return { data, isLoading, error, refetch: () => {} };
  };

  return {
    get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => 
      apiRequest<T>(endpoint, { ...options, method: 'GET' }),
    
    post: <T>(endpoint: string, body?: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
      apiRequest<T>(endpoint, { ...options, method: 'POST', body }),
    
    put: <T>(endpoint: string, body?: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
      apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),
    
    delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => 
      apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
    
    useFetch,
  };
};
