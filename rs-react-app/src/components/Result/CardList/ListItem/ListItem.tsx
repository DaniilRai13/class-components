import { FC } from 'react';
import styles from './ListItem.module.scss';
import { IPeople } from '../../../../types/resultAPI.interface';

interface IListItem {
  item: IPeople;
  searchTerm: string | null;
}

const ListItem: FC<IListItem> = ({ item }) => {
  return (
    <>
      <div className={styles.item}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.description}>
          Mass: {item.mass}, Height: {item.height}
        </div>
      </div>
    </>
  );
};

export default ListItem;
