import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './field.module.scss';
import { IField } from './form.interface';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ error, className, placeholder, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={cn(styles.field, className)} style={style}>
        <label>
          <span>{placeholder}</span>
          <input ref={ref} type={type} {...rest} />
        </label>
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    );
  }
);

Field.displayName = 'Field';

export default Field;
