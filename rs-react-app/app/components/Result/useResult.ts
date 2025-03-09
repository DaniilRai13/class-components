import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useActions } from 'hooks/useActions';
import { useLazyGetListPeoplesQuery } from '../../store/people/peopleApi';
import { createQueryString } from 'utils/createQueryString';

const useResult = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { handleError } = useActions();

  const handlePageChange = async (newPage: number) => {
    router.push(pathname + '?' + createQueryString(searchParams, 'page', `${newPage}`))
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
