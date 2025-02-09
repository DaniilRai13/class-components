import { FC } from 'react';
import { CardList } from './CardList/CardList';
import { IPeoples } from '../../types/resultAPI.interface';
import styles from './Result.module.scss';
import { useNavigation, useParams, useSearchParams } from 'react-router';

interface IResult {
  result: IPeoples | null;
  isLoading: boolean;
  onSearch: (endpoint: string) => void;
}

export const Result: FC<IResult> = ({ result, isLoading, onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = async (newPage: number, page: string) => {
    if (page === 'prev' && result?.previous)
      onSearch(`people/?page=${newPage}`);
    else if (page === 'next' && result?.next)
      onSearch(`people/?page=${newPage}`);

    setSearchParams({ page: newPage.toString() });
  };

  return (
    <>
      <div className={styles.result}>
        <CardList result={result} isLoading={isLoading} />
        <div className={styles.navigation}>
          <button
            className={styles.prev}
            onClick={() => handlePageChange(currentPage - 1, 'prev')}
            disabled={isLoading || !result?.previous}
          >
            prev
          </button>
          <button
            className={styles.next}
            onClick={() => handlePageChange(currentPage + 1, 'next')}
            disabled={isLoading || !result?.next}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};
