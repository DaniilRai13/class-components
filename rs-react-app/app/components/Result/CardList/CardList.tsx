import { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useThemeValues } from '../../../providers/ThemeProvider/useTheme';
import Skeleton from '../../../shared/Skeleton/Skeleton';
import styles from './CardList.module.scss';
import ListItem from './ListItem/ListItem';

export const CardList: FC = () => {
  const { peoples, isLoading } = useTypedSelector(({ people }) => people);
  const theme = useThemeValues()
  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.header}>
          <h4 className={styles.name} data-theme={theme === 'light' ? 'light' : 'dark'}>People name</h4>
          <h4 className={styles.description}>People description</h4>
        </div>
        <div className={styles.list} data-theme={theme === 'light' ? 'light' : 'dark'}>
          {isLoading ? (
            <Skeleton count={7} />
          ) : (
            peoples &&
            peoples.map((item) => <ListItem key={item.url} item={item} />)
          )}
        </div>
      </div>
    </>
  );
};
