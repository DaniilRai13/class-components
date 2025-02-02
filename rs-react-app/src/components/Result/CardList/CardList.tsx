import { Component } from 'react';
import { ApiResponse } from '../../../types/resultAPI.interface';
import Card from './Card/Card';
import styles from './CardList.module.scss'
import { localStorageHelper } from '../../../shared/useLocalStorage';

interface ICardList {
  result: ApiResponse | null;
}

class CardList extends Component<ICardList> {

  render() {
    const { result } = this.props;
    const searchTerm = localStorageHelper.getFromLocalStorage('searchTerm')
    const itemName = `${searchTerm?.charAt(0).toUpperCase()}${searchTerm?.slice(1, searchTerm?.length)}`
    return (
      <>
        <div className={styles.listContainer}>
          <div className={styles.header}>
            <h4 className={styles.name}>{itemName} name</h4>
            <h4 className={styles.description}>{itemName} description</h4>
          </div>
          <div className={styles.list}>
            {result?.results &&
              result.results.map((item, index) => (
                <Card key={index} item={item} searchTerm={searchTerm} />
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default CardList;
