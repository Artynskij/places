import { FC } from "react";
import { FaViber } from "react-icons/fa";
import { IIcon } from "../type";
import styles from '../icon.module.scss'

interface IIconViber extends IIcon {
  classic?: boolean;
}
export const IconViber: FC<IIconViber> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return <FaViber style={style} onClick={onClick} className={`${className} ${styles.viber} ${styles.icon_social}`} />;
};
