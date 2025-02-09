import { FC, useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { useSearchParams } from 'react-router';
import { useFetchSwap } from '../../../services/useFetchSwip';

const Card: FC<{ closeDetail: (isOpen: boolean) => void }> = ({
  closeDetail,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const { getPeople, peopleResult } = useFetchSwap();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (detailsId) {
        setIsLoading(true);
        try {
          await getPeople(+detailsId); // Ожидаем завершения вызова getPeople
        } catch (error) {
          console.error('Error fetching data', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData(); // Вызываем асинхронную функцию
  }, [detailsId]);

  return !isLoading ? (
    <section className={styles.card}>
      <div className={styles.cardInner}>
        <h2 className={styles.name}>{peopleResult?.name}</h2>
        <div className={styles.mainInfo}>
          <h3 className={styles.mainTitle}>Main Info:</h3>
          <div className={styles.mainInfoContainer}>
            <div className={styles.item}>
              <strong>Gender:</strong> {peopleResult?.gender}
            </div>
            <div className={styles.item}>
              <strong>Height:</strong>
              {peopleResult?.height}
            </div>
            <div className={styles.item}>
              <strong>Mass:</strong>
              {peopleResult?.mass}
            </div>
            <div className={styles.item}>
              <strong>Birth Year:</strong>
              {peopleResult?.birth_year}
            </div>
          </div>
        </div>
        <div className={styles.secondInfo}>
          <h5 className={styles.secondTitle}>Second Info:</h5>
          <div className={styles.secondInfoContainer}>
            <div className={styles.item}>
              <strong>Hair:</strong>
              {peopleResult?.hair_color}
            </div>
            <div className={styles.item}>
              <strong>Skin:</strong>
              {peopleResult?.skin_color}
            </div>
            <div className={styles.item}>
              <strong>Eye:</strong>
              {peopleResult?.eye_color}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          closeDetail(false);
          setSearchParams((params) => ({
            ...(params.get('page') ? { page: params.get('page')! } : {}),
          }));
        }}
      >
        Close Details
      </button>
    </section>
  ) : (
    <div>Loading....</div>
  );
};

export default Card;
