import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useActions } from 'hooks/useActions';
import { useLazyGetListPeoplesQuery } from '../../store/people/peopleApi';

const useResult = () => {
  const router = useRouter();
  const { query } = router;
  const currentPage = Number(query.page);
  const { handleError } = useActions();

  const handlePageChange = async (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, page: newPage.toString() }
    })
  };
  const [getPeoples, { data: result, isFetching }] =
    useLazyGetListPeoplesQuery();

  useEffect(() => {
    const fetchListOfPeoples = async () => {
      try {
        if (currentPage) {
          const result = await getPeoples(currentPage);
          if (result.error) {
            if (
              'originalStatus' in result.error &&
              result.error.originalStatus === 404
            ) {
              throw new Error('Bad request. 404 status');
            }
            throw new Error('Something went wrong!');
          }
        }
      } catch (error) {
        handleError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchListOfPeoples();
  }, [currentPage, handleError, getPeoples]);

  return { handlePageChange, result, isFetching, currentPage };
};

export default useResult;
