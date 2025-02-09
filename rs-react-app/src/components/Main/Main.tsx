import { FC, MouseEvent, useEffect } from 'react';
import styles from './Main.module.scss';
import { Result } from '../Result/Result';
import { IPeoples } from '../../types/resultAPI.interface';
import { Outlet, useSearchParams } from 'react-router';

interface IMain {
  result: IPeoples | null;
  isLoading: boolean;
  onSearch: (endpoint: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Main: FC<IMain> = ({
  result,
  isLoading,
  onSearch,
  isOpen,
  setIsOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDetails = searchParams.get('details');

  useEffect(() => {
    onSearch(`people/?page=${currentPage}`);
  }, []);

  const closeDetails = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.main)) {
      setIsOpen(false);
      setSearchParams({ page: currentPage.toString() });
    }
  };

  return (
    <main className={styles.main} onClick={(e) => closeDetails(e)}>
      <Result
        result={result}
        isLoading={isLoading}
        onSearch={onSearch}
        setIsOpen={setIsOpen}
      />
      {currentDetails && isOpen && <Outlet />}
    </main>
  );
};

export default Main;
