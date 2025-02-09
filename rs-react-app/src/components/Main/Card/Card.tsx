import { FC } from 'react'
import { IPeople } from '../../../types/resultAPI.interface'
import styles from './Card.module.scss'

interface ICard {
  result: IPeople | undefined;
}

const Card: FC<ICard> = ({ result }) => {
  return (
    <section className={styles.card}>
      <div className={styles.cardInner}>
        <h2 className={styles.name}>{result?.name}</h2>
        <div className={styles.mainInfo}>
          <h3 className={styles.mainTitle}>Main Info:</h3>
          <div className={styles.mainInfoContainer}>
            <div className={styles.item}><strong>Gender:</strong> {result?.gender}</div>
            <div className={styles.item}><strong>Height:</strong>{result?.height}</div>
            <div className={styles.item}><strong>Mass:</strong>{result?.mass}</div>
            <div className={styles.item}><strong>Birth Year:</strong>{result?.birth_year}</div>
          </div>
        </div>
        <div className={styles.secondInfo}>
          <h5 className={styles.secondTitle}>Second Info:</h5>
          <div className={styles.secondInfoContainer}>
            <div className={styles.item}><strong>Hair:</strong>{result?.hair_color}</div>
            <div className={styles.item}><strong>Skin:</strong>{result?.skin_color}</div>
            <div className={styles.item}><strong>Eye:</strong>{result?.eye_color}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Card
