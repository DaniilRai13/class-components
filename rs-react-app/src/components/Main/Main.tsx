import { Component } from "react";
import styles from './Main.module.scss'
import Result from "../Result/Result";
class Main extends Component {
  render() {
    return (
      <main className={styles.main}>
        <Result />
      </main>
    )
  }
}

export default Main;