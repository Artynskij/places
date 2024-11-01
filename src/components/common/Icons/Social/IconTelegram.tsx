import { FC } from "react";
import { FaTelegram } from "react-icons/fa6";
import { IIcon } from "../type";
import styles from '../icon.module.scss'

interface IIconTelegram extends IIcon {}
export const IconTelegram: FC<IIconTelegram> = ({ className, style, onClick }) => {
  return (
    <FaTelegram style={style} onClick={onClick} className={`${className} ${styles.telegram} ${styles.icon_social}`} />
  );
};
