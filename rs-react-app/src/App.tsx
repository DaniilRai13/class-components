import { FC, useState } from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import { useFetchSwap } from './services/useFetchSwip';
import { Navigate, Route, Routes } from 'react-router';
import Card from './components/Main/Card/Card';

const App: FC = () => {
  const { result, isLoading, error, onSearchResults, setError } =
    useFetchSwap();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Routes>
          <Route
            path="/page:id?"
            element={
              <Main
                result={result}
                isLoading={isLoading}
                onSearch={onSearchResults}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            }
          >
            <Route
              path="details:id?"
              element={<Card closeDetail={setIsOpen} />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
        <button className={styles.throwErrorBtn} onClick={throwError}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default App;
