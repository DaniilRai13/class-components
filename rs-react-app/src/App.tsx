import { FC } from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import { useFetchSwap } from './services/useFetchSwip';

const App: FC = () => {
  const { result, isLoading, error, onSearchResults, setError } = useFetchSwap();
  console.log(result)
  const throwError = () => {
    setError('Test error');
    throw new Error('Test error');
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <ErrorBoundary error={error || ''} resetError={resetError}>
      <div className={styles.container}>
        <Header onSearchResults={onSearchResults} isLoading={isLoading} />
        <Main result={result} isLoading={isLoading} />
        <Footer />
        <button className={styles.throwErrorBtn} onClick={throwError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
