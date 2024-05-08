import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: 'http://3.239.191.235:3000/api/'
});

type QueryParams = {
    dataInicial?: string;
    dataFinal?: string;
    limite?: number;
    myAuctions?: boolean;
    category?: string;
}

export function useFetch<T>(url: string, params?: QueryParams) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        api.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: params || {}
        })
            .then(response => {
                if (response.status !== 200) {
                    setError(response.data.message);
                } else {
                    setData(response.data);
                }
            })
            .catch(error => {
                setError(error as string);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    
    return { data, loading, error };
}