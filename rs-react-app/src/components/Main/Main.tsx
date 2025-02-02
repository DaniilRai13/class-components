import { Component } from 'react';
import styles from './Main.module.scss';
import Result from '../Result/Result';
import { ApiResponse } from '../../types/resultAPI.interface';

interface IMain {
  result: ApiResponse | null;
  isLoading: boolean;
}

class Main extends Component<IMain> {
  render() {
    const { result, isLoading } = this.props;
    return (
      <main className={styles.main}>
        <Result result={result} isLoading={isLoading} />
      </main>
    );
  }
}

export default Main;
