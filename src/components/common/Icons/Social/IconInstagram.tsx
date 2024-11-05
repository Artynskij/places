import { FC } from "react";
import { FaInstagram } from "react-icons/fa";
import { IIcon } from "../type";
import styles from "../icon.module.scss";

interface IIconInstagram extends IIcon {
  classic?: boolean;
}
export const IconInstagram: FC<IIconInstagram> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return (
    
    <FaInstagram
      style={style}
      onClick={onClick}
      className={`${className} ${styles.instagram} ${styles.icon_social}`}
    />
  );
};
