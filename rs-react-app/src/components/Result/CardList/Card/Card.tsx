import { FC } from 'react';
import styles from './Card.module.scss';
import { IPeople } from '../../../../types/resultAPI.interface';

interface ICard {
  item: IPeople;
  searchTerm: string | null;
}

export const Card: FC<ICard> = ({ item }) => {
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
}

