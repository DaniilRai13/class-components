import { FC } from 'react';
import Skeleton from '../../../shared/Skeleton/Skeleton';
import { useLocalStorage } from '../../../shared/useLocalStorage';
import { IPeoples } from '../../../types/resultAPI.interface';
import styles from './CardList.module.scss';
import ListItem from './ListItem/ListItem';

interface ICardList {
  result: IPeoples | undefined;
  isLoading: boolean;
}

export const CardList: FC<ICardList> = ({ isLoading, result }) => {
  const { value: searchTerm } = useLocalStorage('searchTerm')
  const itemName = searchTerm
    ? `${searchTerm?.charAt(0).toUpperCase()}${searchTerm?.slice(1, searchTerm?.length)}`
    : 'Item';

  return (
    <>
      {searchTerm && (
        <div className={styles.listContainer}>
          <div className={styles.header}>
            <h4 className={styles.name}>{itemName} name</h4>
            <h4 className={styles.description}>{itemName} description</h4>
          </div>
          <div className={styles.list}>
            {isLoading ? (
              <Skeleton count={7} />
            ) : (
              result?.results &&
              result.results.map((item) => (
                <ListItem
                  key={item.url}
                  item={item}
                />
              ))
            )}
          </div>
        </div>
      )
      }
    </>
  );
};
