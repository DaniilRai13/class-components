import { FC } from 'react';
import styles from './Footer.module.scss';
import { useThemeValues } from '../../providers/ThemeProvider/useTheme';

const Footer: FC = () => {
  const theme = useThemeValues()
  console.log(theme)
  return (
    <footer className={styles.footer} data-theme={theme === 'light' ? 'light' : 'dark'}>
      <div className={styles.container}>
        <p className={styles.text}>© 2025 Rai Daniil. All rights reserved.</p>
        <div className={styles.links}>
          <a
            href="https://t.me/DaniilRai"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            Telegram
          </a>
          <a
            href="https://github.com/DaniilRai13/"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
