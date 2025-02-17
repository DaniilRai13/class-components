import { FC } from 'react';
import { IPeople } from '../../../../types/resultAPI.interface';
import styles from './ListItem.module.scss';

interface IListItem {
  item: IPeople;
  searchTerm: string | null;
  showDetails: (id: string) => void;
}

const ListItem: FC<IListItem> = ({ item, showDetails }) => {
  return (
    <>
      <div className={styles.item} onClick={() => showDetails(item.id)}>
        <div className={styles.title}>
          <input type="checkbox" />
          {item.name}
        </div>
        <div className={styles.description}>
          Mass: {item.mass}, Height: {item.height}
        </div>
      </div>
    </>
  );
};

export default ListItem;
