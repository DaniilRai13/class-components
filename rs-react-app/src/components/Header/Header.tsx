import { Component } from "react";
import styles from './Header.module.scss'
import Search from "./Search/Search";
class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img alt="logo" src="https://img.icons8.com/bubbles/512/react.png" />
        </div>
        <Search />
      </header>
    )
  }
}

export default Header;