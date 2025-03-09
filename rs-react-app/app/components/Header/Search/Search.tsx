"use client"

import { useLazyGetQueryQuery } from '@/store/people/peopleApi';
import { useActions } from 'hooks/useActions';
import { useRouter } from 'next/navigation';
import { useThemeValues } from 'providers/ThemeProvider/useTheme';
import { ChangeEvent, FC, useState } from 'react';
import styles from './Search.module.scss';

const Search: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [apiEndpoints] = useState<string[]>(['people/']);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [trigger, { isFetching }] = useLazyGetQueryQuery();
  const router = useRouter();

  const { handleError } = useActions();
  const theme = useThemeValues();

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
        if (
          'originalStatus' in result.error &&
          result.error.originalStatus === 404
        ) {
          throw new Error('Bad request. 404 status');
        }
        throw new Error('Something went wrong!');
      }
      router.push('people/');
    } catch (error) {
      handleError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <span>
        <div className={styles.apiLabel} data-theme={theme === 'light' ? 'light' : 'dark'}>API: https://swapi.dev/api/</div>
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
      </span>
      <button onClick={() => handleSearch(query || '')} disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};

export default Search;
