
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  disableToast?: boolean;
}

export const useLiferootAPI = () => {
  const { currentUser } = useAuth();
  const baseUrl = "/api";

  const apiRequest = async<T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { method = 'GET', body, headers = {}, disableToast = false } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };

    if (currentUser) {
      requestHeaders['Authorization'] = `Bearer ${localStorage.getItem('liferoot_token')}`;
    }

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      requestConfig.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, requestConfig);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      if (!disableToast) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          variant: "destructive"
        });
      }
      
      throw error;
    }
  };

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
              toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'An unknown error occurred',
                variant: "destructive"
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
