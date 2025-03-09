import { useRouter } from 'next/router';
import { useThemeValues } from 'providers/ThemeProvider/useTheme';
import { FC, MouseEvent, useEffect } from 'react';
import { Result } from '../Result/Result';
import Card from './Card/Card';
import styles from './Main.module.scss';
import SelectedItems from './SelectedItems/SelectedItems';

const Main: FC = () => {
  const router = useRouter()
  const { query } = router;
  const currentPage = Number(query.page) || 1;;
  const currentDetails = query.details;
  const theme = useThemeValues();

  const closeDetails = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.main)) {
      router.push({
        pathname: router.pathname,
        query: { page: currentPage.toString() },
      });
    }
  };
  useEffect(() => {
    if (!query.page) {
      router.push({
        pathname: router.pathname,
        query: {
          page: 1
        },
      });
    }
  }, [query, router]);
  return (
    <main
      className={styles.main}
      data-theme={theme === 'light' ? 'light' : 'dark'}
      onClick={(e) => closeDetails(e)}
    >
      <div className={styles.resultInner}>
        <Result />
        {currentDetails && <Card />}
      </div>
      {currentPage && <SelectedItems />}
    </main>
  );
};

export default Main;
