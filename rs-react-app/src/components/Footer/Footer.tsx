import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer} >
      <div className={styles.container}>
        <p className={styles.text}>
          © 2025 Rai Daniil. All rights reserved.
        </p>
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
}

export default Footer;
