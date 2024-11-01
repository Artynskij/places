import { FC } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IIcon } from "../type";
import styles from "../icon.module.scss";

interface IIconWhatApp extends IIcon {
  classic?: boolean;
}
export const IconWhatApp: FC<IIconWhatApp> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return (
    <FaWhatsapp
      style={style}
      onClick={onClick}
      className={`${className} ${styles.whatsapp} ${styles.icon_social}`}
    />
  );
};
