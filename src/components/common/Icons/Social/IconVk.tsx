import { FC } from "react";
import { FaVk } from "react-icons/fa6";
import { IIcon } from "../type";
import styles from '../icon.module.scss'

interface IIconVk extends IIcon {
  classic?: boolean;
}
export const IconVk: FC<IIconVk> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return <FaVk style={style} onClick={onClick} className={`${className} ${styles.vk} ${styles.icon_social}`} />;
};
