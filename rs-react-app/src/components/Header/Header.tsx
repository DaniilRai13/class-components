import { FC } from 'react';
import styles from './Header.module.scss';
import Search from './Search/Search';

interface IHeader {
  onSearchResults: (endpoint: string) => void;
  isLoading: boolean;
}

const Header: FC<IHeader> = ({ onSearchResults, isLoading }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img alt="logo" src="https://img.icons8.com/bubbles/512/react.png" />
      </div>
      <Search onSearchResults={onSearchResults} isLoading={isLoading} />
    </header>
  );
}

export default Header;
