import { useRouter } from 'next/router';
import { FC } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useThemeValues } from '../../../providers/ThemeProvider/useTheme';
import { useGetPeopleByIdQuery } from '../../../store/people/peopleApi';
import styles from './Card.module.scss';

const Card: FC = () => {
  const router = useRouter()
  const { query } = router;
  const detailsId = query.details?.toString();
  const {
    data: people,
    isFetching,
    isError,
  } = useGetPeopleByIdQuery(detailsId || '');
  const { handleError } = useActions();
  const theme = useThemeValues();

  if (isError) {
    handleError('Bad request');
  }

  return isFetching ? (
    <div>Loading....</div>
  ) : (
    <section className={styles.card}>
      <div className={styles.cardInner} data-theme={theme === 'light' ? 'light' : 'dark'}>
        <h2 className={styles.name}>{people?.name}</h2>
        <div className={styles.mainInfo}>
          <h3 className={styles.mainTitle} data-theme={theme === 'light' ? 'light' : 'dark'}>Main Info:</h3>
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
          <h5 className={styles.secondTitle} data-theme={theme === 'light' ? 'light' : 'dark'}>Second Info:</h5>
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
            router.push({
              pathname: router.pathname,
              query: {
                page: query.page
              }
            })
          }}
        >
          x
        </button>
      </div>
    </section>
  );
};

export default Card;
