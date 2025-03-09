"use client"

import { FC, MouseEvent, useRef } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IPeople } from '../../../../types/resultAPI.interface';
import styles from './ListItem.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from 'utils/createQueryString';

interface IListItem {
  item: IPeople;
}

const ListItem: FC<IListItem> = ({ item }) => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const showDetails = (event: MouseEvent<HTMLDivElement>, detailId: string) => {
    if (event.target === ref.current) return;
    router.push(pathname + '?' + createQueryString(searchParams, 'details', `${detailId}`));
  };
  const { toggleMarkedPeoples } = useActions();
  const { markedPeoples } = useTypedSelector(({ people }) => people);

  const isChecked = (item: IPeople) => {
    return markedPeoples.some((markedPeople) => markedPeople.id === item.id);
  };

  return (
    <>
      <div className={styles.item} onClick={(e) => showDetails(e, item.id)}>
        <div className={styles.title}>
          <input
            ref={ref}
            type="checkbox"
            checked={isChecked(item)}
            onChange={() => toggleMarkedPeoples(item)}
          />
          <span>{item.name}</span>
        </div>
        <div className={styles.description}>
          Mass: {item.mass}, Height: {item.height}
        </div>
      </div>
    </>
  );
};

export default ListItem;
