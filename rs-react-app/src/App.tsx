import { FC } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import styles from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useActions } from './components/hooks/useActions';
import { useTypedSelector } from './components/hooks/useTypedSelector';
import Card from './components/Main/Card/Card';
import Main from './components/Main/Main';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';

const App: FC = () => {
  const { errorMessage } = useTypedSelector(({ errorReducer }) => errorReducer);
  const { handleError, resetError: reset } = useActions();
  const navigate = useNavigate();

  const throwError = () => {
    handleError('Test error');
    throw new Error('Test error');
  };

  const resetError = () => {
    reset();
    navigate(-1);
  };

  return (
    <ErrorBoundary error={errorMessage || ''} resetError={resetError}>
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path="page:id?" element={<Main />}>
            <Route path="details:id?" element={<Card />} />
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
