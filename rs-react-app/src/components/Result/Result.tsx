import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../shared/useLocalStorage';
import { useLazyGetListPeoplesQuery } from '../../store/people/peopleApi';
import { useActions } from '../hooks/useActions';
import { CardList } from './CardList/CardList';
import styles from './Result.module.scss';

export const Result:FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));
  const { value: searchTerm } = useLocalStorage('searchTerm');
  const { handleError } = useActions();

  const handlePageChange = async (newPage: number) => {
    setSearchParams((params) => {
      return {
        page: newPage.toString(),
        ...(params.get('details') ? { details: params.get('details')! } : {}),
      }
    })
  }
  const [getPeoples, { data: result, isFetching }] = useLazyGetListPeoplesQuery()

  useEffect(() => {
    const fetchListOfPeoples = async () => {
      try {
        if (currentPage) {
          const result = await getPeoples(currentPage)
          if (result.error) {

            if ('originalStatus' in result.error && result.error.originalStatus === 404) {
              throw new Error('Bad request. 404 status')
            }
            throw new Error('Something went wrong!')
          }
        }
      } catch (error) {
        handleError(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    fetchListOfPeoples()
  }, [currentPage, handleError, getPeoples])

  return (
    <>
      {currentPage && searchTerm?.includes('people') ? <div className={styles.result}>
        <CardList result={result}
          isLoading={isFetching} />
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
