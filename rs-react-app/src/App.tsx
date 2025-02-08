import { FC, useCallback, useState } from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { SwapiApiServices } from './services/SwipApiServices';
import { useLocalStorage } from './shared/useLocalStorage';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import { IPeoples } from './types/resultAPI.interface';

const App: FC = () => {
  const [result, setResult] = useState<IPeoples | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [_, setQuery] = useLocalStorage('searchTerm', '')

  const onSearchResults = useCallback(async (endpoint: string) => {
    if (!endpoint) return;

    setIsLoading(true);

    try {
      const data = await SwapiApiServices.get(endpoint);
      console.log(endpoint)
      const endpointEdit = endpoint.trim().toLowerCase().split('/')[0];
      setQuery(endpointEdit)
      setResult(data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const throwError = () => {
    setError('Test error');
    throw new Error('Test error');
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <ErrorBoundary
      error={error || ''}
      resetError={resetError}
    >
      <div className={styles.container}>
        <Header
          onSearchResults={onSearchResults}
          isLoading={isLoading}
        />
        <Main result={result} isLoading={isLoading} />
        <Footer />
        <button className={styles.throwErrorBtn} onClick={throwError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
}

export default App;
