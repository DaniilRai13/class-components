import { useState, useCallback } from 'react';
import { SwapiApiServices } from '../services/SwipApiServices';
import { useLocalStorage } from '../shared/useLocalStorage';
import { IPeople, IPeoples } from '../types/resultAPI.interface';

export const useFetchSwap = () => {
  const [result, setResult] = useState<IPeoples | null>(null);
  const [peopleResult, setPeopleById] = useState<IPeople | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setLocalStorageValue } = useLocalStorage('searchTerm');

  const onSearchResults = useCallback(async (endpoint: string) => {
    if (!endpoint) return;

    setIsLoading(true);

    try {
      const data = await SwapiApiServices.get(endpoint);
      const endpointEdit = endpoint.trim().toLowerCase().split('/')[0];
      setLocalStorageValue('searchTerm', endpointEdit)
      setResult(data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const getPeople = useCallback(async (id: number) => {
    if (!id) return;

    setIsLoading(true);

    try {
      const data = await SwapiApiServices.getPeopleById(id);
      setPeopleById(data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { result, isLoading, error, onSearchResults, peopleResult, getPeople, setError };
};
