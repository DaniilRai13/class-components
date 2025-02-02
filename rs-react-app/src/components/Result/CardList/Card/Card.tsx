import { Component } from 'react';
import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from '../../../../types/resultAPI.interface';
import styles from './Card.module.scss';

interface ICard {
  item: IPeople | IPlanet | IFilm | ISpecie | IVehicle | IStarship;
  searchTerm: string | null;
}

class Card extends Component<ICard> {
  renderItemDetails(
    item: IPeople | IPlanet | IFilm | ISpecie | IVehicle | IStarship,
    searchTerm: string
  ) {
    switch (searchTerm) {
      case 'people':
        if ('height' in item && 'mass' in item) {
          return `Height: ${item.height}, Mass: ${item.mass}`;
        } else {
          return 'Nothing to display for people';
        }

      case 'planets':
        if ('climate' in item && 'terrain' in item) {
          return `Climate: ${item.climate}, Terrain: ${item.terrain}`;
        } else {
          return 'Nothing to display for planet';
        }

      case 'films':
        if ('director' in item && 'release_date' in item) {
          return `Director: ${item.director}`;
        } else {
          return 'Nothing to display for film';
        }

      case 'species':
        if ('classification' in item) {
          return `Classification: ${item.classification}`;
        } else {
          return 'Nothing to display for species';
        }

      case 'vehicles':
        if ('model' in item && 'manufacturer' in item) {
          return `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
        } else {
          return 'Nothing to display for vehicle';
        }

      case 'starships':
        if ('model' in item && 'manufacturer' in item) {
          return `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
        } else {
          return 'Nothing to display for starship';
        }

      default:
        return 'Nothing to display for unknown item type';
    }
  }

  render() {
    const { item, searchTerm } = this.props;

    let name: string | undefined;

    if ('name' in item) {
      name = item.name;
    } else if ('title' in item) {
      name = item.title;
    }

    return (
      <>
        <div className={styles.item}>
          <div className={styles.title}>{name}</div>
          <div className={styles.description}>
            {searchTerm && this.renderItemDetails(item, searchTerm)}
          </div>
        </div>
      </>
    );
  }
}

export default Card;
