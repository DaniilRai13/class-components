import { FC } from 'react';
import { CardList } from './CardList/CardList';
import { IPeoples } from '../../types/resultAPI.interface';
import styles from './Result.module.scss'

interface IResult {
  result: IPeoples | null;
  isLoading: boolean;
}

export const Result: FC<IResult> = ({ result, isLoading }) => {
  return (
    <>
      <div className={styles.result}>
        <CardList result={result} isLoading={isLoading} />
      </div>
    </>
  );
};
