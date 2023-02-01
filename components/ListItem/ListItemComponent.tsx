import { Icon } from '..';
import { TAvailableIcons } from '../Icon/IconComponent';
import styles from './ListItemComponent.module.scss';

export type TListItem = {
  title: string;
  subtitle: string;
  onClick?: () => void;
  icon?: TAvailableIcons;
};

export const ListItemComponent = (props: TListItem) => {
  const handleClick = () => {
    props.onClick?.();
  };

  return (
    <div className={styles.listItem} onClick={handleClick}>
      {props.icon && (
        <div className={styles.icon}>
          <Icon name={props.icon} color="epiroc-yellow" />
        </div>
      )}
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.subtitle}>{props.subtitle}</p>
      </div>
    </div>
  );
};
