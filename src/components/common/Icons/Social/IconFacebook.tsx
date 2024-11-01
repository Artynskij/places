

import { FC } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { IIcon } from "../type";
import styles from "../icon.module.scss";

interface IIconFacebook extends IIcon {
  classic?: boolean;
}
export const IconFacebook: FC<IIconFacebook> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return (
    <FaFacebookSquare 
      style={style}
      onClick={onClick}
      className={`${className} ${styles.facebook} ${styles.icon_social}`}
    />
  );
};
