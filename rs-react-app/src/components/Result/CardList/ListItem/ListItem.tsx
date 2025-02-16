import { FC } from 'react';
import styles from './ListItem.module.scss';
import { IPeople } from '../../../../types/resultAPI.interface';

interface IListItem {
  item: IPeople;
  searchTerm: string | null;
  showDetails: (id: string) => void;
}

const ListItem: FC<IListItem> = ({ item, showDetails }) => {
  const id = item.url.split('/')[item.url.split('/').length - 2];
  return (
    <>
      <div className={styles.item} onClick={() => showDetails(id)}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.description}>
          Mass: {item.mass}, Height: {item.height}
        </div>
      </div>
    </>
  );
};

export default ListItem;
