import { Component } from 'react';
import styles from './Main.module.scss';
import Result from '../Result/Result';
import { ApiResponse } from '../../types/resultAPI.interface';

interface IMain {
  result: ApiResponse | null;
}

class Main extends Component<IMain> {
  render() {
    const { result } = this.props;
    return (
      <main className={styles.main}>
        <Result result={result} />
      </main>
    );
  }
}

export default Main;
