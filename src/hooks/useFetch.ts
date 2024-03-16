import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:3333/api/'
});

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    useEffect(() => {
        api.get(url)
            .then(response => {
                setData(response.data);
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