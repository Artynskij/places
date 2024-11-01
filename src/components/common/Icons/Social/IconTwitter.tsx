import { FC } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IIcon } from "../type";
import styles from '../icon.module.scss'

interface IIconTwitter extends IIcon {
  classic?: boolean;
}
export const IconTwitter: FC<IIconTwitter> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return <FaXTwitter style={style} onClick={onClick} className={`${className} ${styles.twitter} ${styles.icon_social}`} />;
};
