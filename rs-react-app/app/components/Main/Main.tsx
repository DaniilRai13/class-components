"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useThemeValues } from 'providers/ThemeProvider/useTheme';
import { FC, MouseEvent, useEffect } from 'react';
import { Result } from '../Result/Result';
import Card from './Card/Card';
import styles from './Main.module.scss';
import SelectedItems from './SelectedItems/SelectedItems';
import { createQueryString } from 'utils/createQueryString';

const Main: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;;
  const currentDetails = searchParams.get("details");
  const theme = useThemeValues();

  const closeDetails = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.main)) {
      router.push(pathname + `?page=${currentPage}`);
    }
  };
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.push(pathname + '?' + createQueryString(searchParams, 'page', `1`));
    }
  }, [pathname, router, searchParams]);
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
