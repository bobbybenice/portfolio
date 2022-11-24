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
  [iconType in TAvailableIcons]: TAvailableIconStyles;
}> = {
  Hawks: 'none',
  Cavaliers: 'none',
  Celtics: 'none',
  Bulls: 'none',
  Hornets: 'none',
  Mavericks: 'none',
  Nets: 'none',
  Nuggets: 'none',
  Pistons: 'none',
};

type TIconComponentProps = {
  name: TAvailableIcons;
  color: TAvailableColors;
  className?: string;
  width?: number;
  height?: number;
};

export const IconComponent = ({ name, ...props }: TIconComponentProps) => {
  let Icon = iconTypes[name];
  const style: { [key: string]: string } = {
    '--iconColor': `var(--${props.color})`,
  };

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
