import { FC } from 'react';
import { IPeople } from '../../../../types/resultAPI.interface';
import styles from './ListItem.module.scss';
import { useSearchParams } from 'react-router';

interface IListItem {
  item: IPeople;
}

const ListItem: FC<IListItem> = ({ item }) => {
  const [, setSearchParams] = useSearchParams()

  const showDetails = (detailId: string) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set('details', detailId)
      return newParams
    })
  }

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
