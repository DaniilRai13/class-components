import { FC } from 'react';
import { useLocalStorage } from '../../shared/useLocalStorage';
import { CardList } from './CardList/CardList';
import styles from './Result.module.scss';
import useResult from './useResult';

export const Result: FC = () => {
  const { value: searchTerm } = useLocalStorage('searchTerm');
  const { handlePageChange, isFetching, result, currentPage } = useResult();

  return (
    <>
      {currentPage && searchTerm?.includes('people') ? <div className={styles.result}>
        <CardList />
        <div className={styles.navigation}>
          <button
            className={styles.prev}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFetching || !result?.previous}
          >
            prev
          </button>
          <button
            className={styles.next}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isFetching || !result?.next}
          >
            next
          </button>
        </div>
      </div>
        : (
          <div className={styles.title}>Welcome! Make a request</div>
        )
      }
    </>
  )
}
