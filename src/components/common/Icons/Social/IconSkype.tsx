import { FC } from "react";
import { FaSkype } from "react-icons/fa";
import { IIcon } from "../type";
import styles from "../icon.module.scss";

interface IIconSkype extends IIcon {
  classic?: boolean;
}
export const IconSkype: FC<IIconSkype> = ({
  className,
  style,
  onClick,
  classic = false,
}) => {
  return (
    <FaSkype
      style={style}
      onClick={onClick}
      className={`${className} ${styles.skype} ${styles.icon_social}`}
    />
  );
};
