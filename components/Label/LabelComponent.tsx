import classNames from 'classnames';

import {
  TAvailableColors,
  TAvailableFontStyles,
  TAvailableTags,
} from '../../styles/types';

import styles from './LabelComponent.module.scss';

type TLabelProps = {
  /**
   * Text to display
   */
  text: string;
  /**
   * Decides what tag to render
   */
  type: TAvailableTags;
  /**
   * Optional className
   */
  className?: string;
  /**
   * Decides what font styles to apply
   */
  displayAs?: TAvailableFontStyles;
  /**
   * Text color
   * @default "epiroc-dark-blue"
   */
  color?: TAvailableColors;
  /**
   * Center align the text
   * @default false
   */
  center?: boolean;
  /**
   * Specifies how to capitalize the text
   * @default 'none'
   */
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  /**
   * Custom line-height
   */
  lineHeight?: number;
};

export const LabelComponent = (props: TLabelProps) => {
  const Tag = props.type;
  const style: { [key: string]: string | number } = {
    '--labelColor': `var(--${props.color ?? 'epiroc-dark-blue'})`,
    '--textTransform': props.textTransform ?? 'none',
  };

  if (props.lineHeight) {
    style.lineHeight = props.lineHeight;
  }

  return (
    <Tag
      style={style}
      className={classNames(props.className, props.displayAs, styles.text, {
        [styles.center]: props.center,
      })}
    >
      {props.text}
    </Tag>
  );
};
