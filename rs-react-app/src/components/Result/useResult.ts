import { useSearchParams } from 'react-router';
import { useActions } from '../hooks/useActions';
import { useEffect } from 'react';
import { useLazyGetListPeoplesQuery } from '../../store/people/peopleApi';

const useResult = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page'));
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

	return { handlePageChange, result, isFetching, currentPage }
}

export default useResult