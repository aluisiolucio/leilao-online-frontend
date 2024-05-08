import { useState } from 'react';
import axios, { AxiosError } from 'axios';


export function useSend<T>(url: string, isToken: boolean = false) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [responseData, setResponseData] = useState<T | null>(null);
  
    const sendRequest = async (requestData: unknown) => {
      setIsLoading(true);
      setError('');
      setResponseData(null);

      let options
      if (isToken) {
        options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      }
  
      try {
        const response = await axios.post<T>(url, requestData, options);
        setResponseData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError((axiosError.response?.data as { message: string })?.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, error, responseData, sendRequest };
  }
  
