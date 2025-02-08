import { ChangeEvent, FC, useState, useEffect } from 'react';
import styles from './Search.module.scss';
import { useLocalStorage } from '../../../shared/useLocalStorage';

interface ISearchProps {
  onSearchResults: (endpoint: string) => void;
  isLoading: boolean;
}

const Search: FC<ISearchProps> = ({ isLoading, onSearchResults }) => {
  const [queryLocalStorage] = useLocalStorage('searchTerm', '');
  const [query, setQuery] = useState<string>(queryLocalStorage);
  const [apiEndpoints] = useState<string[]>(['people/']);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (queryLocalStorage) {
      setQuery(queryLocalStorage);
      handleSearch(queryLocalStorage);
    }
  }, [queryLocalStorage]);

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
      onSearchResults(endpoint);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

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
              <div>Нет доступных запросов</div>
            )}
          </div>
        )}
      </label>
      <button onClick={() => handleSearch(query || '')} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>
      {error && error}
    </div>
  );
};

export default Search;
