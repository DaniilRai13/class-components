import { FC } from 'react';
import { useThemeValues } from '../../providers/ThemeProvider/useTheme';
import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer: FC = () => {
  const theme = useThemeValues()

  return (
    <footer className={styles.footer} data-theme={theme === 'light' ? 'light' : 'dark'}>
      <div className={styles.container}>
        <p className={styles.text}>© 2025 Rai Daniil. All rights reserved.</p>
        <div className={styles.links} data-theme={theme === 'light' ? 'light' : 'dark'}>
          <Link
            href="https://t.me/DaniilRai"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            Telegram
          </Link>
          <Link
            href="https://github.com/DaniilRai13/"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
