import { FC } from 'react';
import { Card } from './Card/Card';
import styles from './CardList.module.scss';
import { localStorageHelper } from '../../../shared/useLocalStorage';
import Skeleton from '../../../shared/Skeleton/Skeleton';
import { IPeoples } from '../../../types/resultAPI.interface';

interface ICardList {
  result: IPeoples | null;
  isLoading: boolean;
}

export const CardList: FC<ICardList> = ({ result, isLoading }) => {
  const searchTerm = localStorageHelper.getFromLocalStorage('searchTerm');
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
              result.results.map((item, index) => (
                <Card key={index} item={item} searchTerm={searchTerm} />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className={styles.title}>Welcome! Make a request</div>
      )}
    </>
  );
}
