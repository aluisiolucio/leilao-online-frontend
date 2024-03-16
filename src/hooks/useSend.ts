import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type ErrorType = {
    message: string;
}

export function useSend<T>(url: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType | null>(null);
    const [responseData, setResponseData] = useState<T | null>(null);
  
    const sendRequest = async (requestData: unknown) => {
      setIsLoading(true);
      setError(null);
      setResponseData(null);
  
      try {
        const response = await axios.post<T>(url, requestData);
        setResponseData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorType>;
        setError(axiosError.response?.data || { message: 'Algo deu errado. Tente novamente mais tarde' });
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, error, responseData, sendRequest };
  }
  
