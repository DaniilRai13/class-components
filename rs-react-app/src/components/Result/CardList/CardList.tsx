import { FC } from 'react';
import ListItem from './ListItem/ListItem';
import styles from './CardList.module.scss';
import { useLocalStorage } from '../../../shared/useLocalStorage';
import Skeleton from '../../../shared/Skeleton/Skeleton';
import { IPeoples } from '../../../types/resultAPI.interface';

interface ICardList {
  result: IPeoples | null;
  isLoading: boolean;
  showDetails: (id: string) => void;
}

export const CardList: FC<ICardList> = ({ result, isLoading, showDetails }) => {
  const { value: searchTerm } = useLocalStorage('searchTerm');
  const itemName = searchTerm
    ? `${searchTerm?.charAt(0).toUpperCase()}${searchTerm?.slice(1, searchTerm?.length)}`
    : 'Item';

  return (
    <>
      {searchTerm ? (
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
                  searchTerm={searchTerm}
                  showDetails={showDetails}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className={styles.title}>Welcome! Make a request</div>
      )}
    </>
  );
};
