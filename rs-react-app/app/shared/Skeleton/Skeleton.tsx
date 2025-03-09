import { Component } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  count?: number;
}

class Skeleton extends Component<SkeletonProps> {
  render() {
    const { count = 1 } = this.props;
    const skeletonLines = Array.from({ length: count }, (_, index) => index);

    return (
      <div className={styles.skeletonWrapper}>
        {skeletonLines.map((_, index) => (
          <div key={index} className={styles.skeletonLine}></div>
        ))}
      </div>
    );
  }
}

export default Skeleton;
