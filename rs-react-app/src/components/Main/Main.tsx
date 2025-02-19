import { FC, MouseEvent, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { Result } from '../Result/Result';
import styles from './Main.module.scss';
import SelectedItems from './SelectedItems/SelectedItems';

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDetails = searchParams.get('details');

  const closeDetails = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.main)) {
      setSearchParams({ page: currentPage.toString() });
    }
  };
  useEffect(() => {
    const page = searchParams.get('page');
    if (!page) {
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);
  return (
    <main className={styles.main} onClick={(e) => closeDetails(e)}>
      <div className={styles.resultInner}>
        <Result />
        {currentDetails && <Outlet />}
      </div>
      {searchParams.get('page') && <SelectedItems />}
    </main>
  );
};

export default Main;
