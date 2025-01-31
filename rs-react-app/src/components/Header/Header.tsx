import { Component } from "react";
import styles from './Header.module.scss'
import Search from "./Search/Search";
import { ApiResponse } from "../../types/resultAPI.interface";

interface IHeader {
  onSearchResults: (data: ApiResponse) => void
}

class Header extends Component<IHeader> {
  render() {
    const { onSearchResults } = this.props
    return (
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img alt="logo" src="https://img.icons8.com/bubbles/512/react.png" />
        </div>
        <Search onSearchResults={onSearchResults} />
      </header>
    )
  }
}

export default Header;