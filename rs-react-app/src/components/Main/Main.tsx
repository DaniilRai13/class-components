import { FC, useEffect } from 'react';
import styles from './Main.module.scss';
import { Result } from '../Result/Result';
import { IPeoples } from '../../types/resultAPI.interface';
import { Outlet, useSearchParams } from 'react-router';

interface IMain {
  result: IPeoples | null;
  isLoading: boolean;
  onSearch: (endpoint: string) => void
}

const Main: FC<IMain> = ({ result, isLoading, onSearch }) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  
  useEffect(() => {
    onSearch(`people/?page=${currentPage}`);
  }, []);

  return (
    <main className={styles.main}>
      <Result result={result} isLoading={isLoading} onSearch={onSearch} />
      <Outlet />
    </main>
  );
};

export default Main;
