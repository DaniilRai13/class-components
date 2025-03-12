import cn from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './Heading.module.scss';

interface IHeading {
  children?: ReactNode;
  className?: string;
}

const Heading: FC<IHeading> = ({ children, className }) => {
  console.log(children);
  return <h3 className={cn(styles.heading, className)}>{children}</h3>;
};

export default Heading;
