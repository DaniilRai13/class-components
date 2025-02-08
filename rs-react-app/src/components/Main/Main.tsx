import { FC } from 'react';
import styles from './Main.module.scss';
import { Result } from '../Result/Result';
import { IPeoples } from '../../types/resultAPI.interface';

interface IMain {
  result: IPeoples | null;
  isLoading: boolean;
}

const Main: FC<IMain> = ({ result, isLoading }) => {
  return (
    <main className={styles.main}>
      <Result result={result} isLoading={isLoading} />
    </main>
  );
};

export default Main;
