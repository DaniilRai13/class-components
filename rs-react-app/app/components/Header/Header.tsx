import { FC } from 'react';
import styles from './Header.module.scss';
import Search from './Search/Search';
import ToggleTheme from './ToggleTheme/ToggleTheme';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img alt="logo" src="https://img.icons8.com/bubbles/512/react.png" />
      </div>
      <span>
        <ToggleTheme />
        <Search />
      </span>
    </header>
  );
};

export default Header;
