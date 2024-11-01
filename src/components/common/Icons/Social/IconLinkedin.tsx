import { FC } from "react";
import { FaLinkedin } from "react-icons/fa6";

import { IIcon } from "../type";
import styles from "../icon.module.scss";

interface IIconLinkedin extends IIcon {
  classic?: boolean;
}
export const IconLinkedin: FC<IIconLinkedin> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return (
    <FaLinkedin
      style={style}
      onClick={onClick}
      className={`${className} ${styles.linkedin} ${styles.icon_social}`}
    />
  );
};
