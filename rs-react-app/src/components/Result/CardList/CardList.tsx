import { FC } from 'react';
import Skeleton from '../../../shared/Skeleton/Skeleton';
import { useLocalStorage } from '../../../shared/useLocalStorage';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './CardList.module.scss';
import ListItem from './ListItem/ListItem';
import { useThemeValues } from '../../../providers/ThemeProvider/useTheme';

export const CardList: FC = () => {
  const { value: searchTerm } = useLocalStorage('searchTerm');
  const itemName = searchTerm
    ? `${searchTerm?.charAt(0).toUpperCase()}${searchTerm?.slice(1, searchTerm?.length)}`
    : 'Item';
  const { peoples, isLoading } = useTypedSelector(({ people }) => people);
  const theme = useThemeValues()
  return (
    <>
      {searchTerm && (
        <div className={styles.listContainer}>
          <div className={styles.header}>
            <h4 className={styles.name} data-theme={theme === 'light' ? 'light' : 'dark'}>{itemName} name</h4>
            <h4 className={styles.description}>{itemName} description</h4>
          </div>
          <div className={styles.list} data-theme={theme === 'light' ? 'light' : 'dark'}>
            {isLoading ? (
              <Skeleton count={7} />
            ) : (
              peoples &&
              peoples.map((item) => <ListItem key={item.url} item={item} />)
            )}
          </div>
        </div>
      )}
    </>
  );
};
