import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type ErrorType = {
    message: string;
}

export function useSend<T>(url: string, isToken: boolean = false) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType | null>(null);
    const [responseData, setResponseData] = useState<T | null>(null);
  
    const sendRequest = async (requestData: unknown) => {
      setIsLoading(true);
      setError(null);
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
        const axiosError = error as AxiosError<ErrorType>;
        setError(axiosError.response?.data || { message: 'Algo deu errado. Tente novamente mais tarde' });
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, error, responseData, sendRequest };
  }
  
