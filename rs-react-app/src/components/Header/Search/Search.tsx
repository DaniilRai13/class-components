import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useLocalStorage } from '../../../shared/useLocalStorage';
import { useLazyGetQueryQuery } from '../../../store/people/peopleApi';
import { useActions } from '../../hooks/useActions';
import styles from './Search.module.scss';

const Search: FC = () => {
  const { value: searchTerm } = useLocalStorage('searchTerm');
  const [query, setQuery] = useState<string>('');
  const [apiEndpoints] = useState<string[]>(['people/']);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [trigger, { isFetching }] = useLazyGetQueryQuery();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleError } = useActions();

  useEffect(() => {
    if (searchTerm) {
      setQuery(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
  };

  const handleListShow = (): void => {
    setIsFocus(true);
  };

  const handleListBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 200);
  };

  const handleSearch = async (endpoint: string): Promise<void> => {
    try {
      const result = await trigger(endpoint);

      if (result.error) {

        if ('originalStatus' in result.error && result.error.originalStatus === 404) {
          throw new Error('Bad request. 404 status');
        }
        throw new Error('Something went wrong!');
      }

      localStorage.setItem('searchTerm', endpoint);
      navigate(query);
      setSearchParams((prevParams) => ({
        ...prevParams,
        page: '1',
      }));
    } catch (error) {
      handleError(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.apiLabel}>API: https://swapi.dev/api/</div>
      <label className={styles.inputContainer}>
        <input
          type="text"
          value={query || ''}
          onChange={handleInputChange}
          onFocus={handleListShow}
          onBlur={handleListBlur}
          placeholder="Start typing..."
        />
        {isFocus && (
          <div className={styles.list}>
            {apiEndpoints.length > 0 ? (
              apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => handleSearch(endpoint)}
                >
                  {endpoint}
                </div>
              ))
            ) : (
              <div>No queries...</div>
            )}
          </div>
        )}
      </label>
      <button onClick={() => handleSearch(query || '')} disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default Search;
