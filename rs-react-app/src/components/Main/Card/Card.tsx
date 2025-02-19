import { FC } from 'react';
import { useSearchParams } from 'react-router';
import { useGetPeopleByIdQuery } from '../../../store/people/peopleApi';
import { useActions } from '../../hooks/useActions';
import styles from './Card.module.scss';

const Card: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const { data: people, isFetching, isError } = useGetPeopleByIdQuery(detailsId || '');
  const { handleError } = useActions()

  if (isError) {
    handleError('Bad request');
  }

  return isFetching ? (
    <div>Loading....</div>
  ) :
    <section className={styles.card}>
      <div className={styles.cardInner}>
        <h2 className={styles.name}>{people?.name}</h2>
        <div className={styles.mainInfo}>
          <h3 className={styles.mainTitle}>Main Info:</h3>
          <div className={styles.mainInfoContainer}>
            <div className={styles.item}>
              <strong>Gender:</strong> {people?.gender}
            </div>
            <div className={styles.item}>
              <strong>Height:</strong>
              {people?.height}
            </div>
            <div className={styles.item}>
              <strong>Mass:</strong>
              {people?.mass}
            </div>
            <div className={styles.item}>
              <strong>Birth Year:</strong>
              {people?.birth_year}
            </div>
          </div>
        </div>
        <div className={styles.secondInfo}>
          <h5 className={styles.secondTitle}>Second Info:</h5>
          <div className={styles.secondInfoContainer}>
            <div className={styles.item}>
              <strong>Hair:</strong>
              {people?.hair_color}
            </div>
            <div className={styles.item}>
              <strong>Skin:</strong>
              {people?.skin_color}
            </div>
            <div className={styles.item}>
              <strong>Eye:</strong>
              {people?.eye_color}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setSearchParams((params) => ({
              ...(params.get('page') ? { page: params.get('page')! } : {}),
            }));
          }}
        >
          x
        </button>
      </div>
    </section>
};

export default Card;
