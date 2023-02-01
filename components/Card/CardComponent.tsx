import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { PropsWithChildren } from 'react';
import styles from './CardComponent.module.scss';

export type TCardProps = {
  title?: string;
  className?: string;
  image?: {
    src: string | StaticImageData;
    alt: string;
    width?: number;
    height?: number;
  };
  boxShadow?: boolean;
};

export const CardComponent = (props: PropsWithChildren<TCardProps>) => {
  return (
    <div
      className={classNames(props.className, styles.card, {
        [styles.boxShadow]: props.boxShadow,
      })}
    >
      {props.image && (
        <Image
          className={styles.image}
          src={props.image.src}
          alt={props.image.alt}
          width={props.image.width}
          height={props.image.height}
        />
      )}
      {props.title && <h3 className={styles.title}>{props.title}</h3>}
      {props.children && (
        <div
          className={classNames(styles.content, {
            [styles.withOutTitle]: !props.title,
          })}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
