import { Component } from 'react';
import styles from './Card.module.scss';
import { IPeople } from '../../../../types/resultAPI.interface';

interface ICard {
  item: IPeople;
  searchTerm: string | null;
}

class Card extends Component<ICard> {

  render() {
    const { item } = this.props;

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
}

export default Card;
