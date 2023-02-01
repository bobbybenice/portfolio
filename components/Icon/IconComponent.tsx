import classNames from 'classnames';

import { TeamLogoIcons } from '../../assets';
import { TAvailableColors, TAvailableIconStyles } from '../../styles/types';

import styles from './IconComponent.module.scss';

const iconLogoTypes = TeamLogoIcons;
const iconTypes = { ...iconLogoTypes };

export type TAvailableIcons = keyof typeof iconTypes;

/**
 * @default "firstPathFill"
 */
const iconElementLibrary: Partial<{
  [_iconType in TAvailableIcons]: TAvailableIconStyles;
}> = {
  ATL: 'none',
  CLE: 'none',
  BOS: 'none',
  CHI: 'none',
  CHA: 'none',
  DAL: 'none',
  BKN: 'none',
  DEN: 'none',
  DET: 'none',
};

type TIconComponentProps = {
  name: TAvailableIcons;
  color?: TAvailableColors;
  className?: string;
  width?: number;
  height?: number;
};

export const IconComponent = ({
  name,
  color,
  ...props
}: TIconComponentProps) => {
  let Icon = iconTypes[name];
  const style: { [key: string]: string } | undefined = color
    ? {
        '--iconColor': `var(--${color})`,
      }
    : undefined;

  const iconProps: React.SVGProps<SVGSVGElement> = {
    width: props.width ?? 32,
    height: props.height ?? 32,
    style: style,
  };

  return (
    <Icon
      name={name}
      {...iconProps}
      className={classNames(
        props.className,
        styles.icon,
        styles[iconElementLibrary[name] ?? 'firstPathFill']
      )}
    />
  );
};
