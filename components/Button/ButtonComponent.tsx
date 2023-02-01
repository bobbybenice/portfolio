import classNames from 'classnames';
import { Icon } from 'components';
import { TAvailableIcons } from 'components/Icon/IconComponent';
import { ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react';
import { TAvailableColors } from 'styles/types';
import styles from './ButtonComponent.module.scss';

type TWithLabel = {
  label: string;
  icon?: TAvailableIcons;
  iconColor?: TAvailableColors;
  children?: never;
};

type TWithIcon = {
  icon: TAvailableIcons;
  iconColor?: TAvailableColors;
  label?: string;
  children?: never;
};

type TWithChildren = {
  children: ReactNode;
  icon?: never;
  label?: never;
};

export type TButtonProps = {
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit';
  /**
   * Button variant
   * @default 'primary'
   */
  surface?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
} & (TWithLabel | TWithIcon | TWithChildren);

const Button = (
  props: PropsWithChildren<TButtonProps>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const {
    className,
    surface = 'primary',
    type = 'button',
    fullWidth,
    disabled,
    onClick,
    id,
  } = props;
  return (
    <button
      ref={ref}
      id={id}
      type={type}
      className={classNames(className, styles.button, styles[surface], {
        [styles.fullWidth]: fullWidth,
        [styles.icon]: props.icon,
        [styles.labelAndIcon]: props.icon && props.label,
        [styles.loading]: props.loading,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {props.children && props.children}
      {props.label && <span>{props.label}</span>}
      {props.icon && (
        <Icon
          className={styles.icon}
          name={props.icon}
          color={props.iconColor ?? 'epiroc-dark-blue'}
        />
      )}
    </button>
  );
};

export const ButtonComponent = forwardRef(Button);
