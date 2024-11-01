import { FC } from "react";
import { FaOdnoklassnikiSquare } from "react-icons/fa";
import { IIcon } from "../type";
import styles from "../icon.module.scss";
interface IIconClassmates extends IIcon {}
export const IconClassmates: FC<IIconClassmates> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <FaOdnoklassnikiSquare
      style={style}
      onClick={onClick}
      className={`${className} ${styles.classmates} ${styles.icon_social}`}
    />
  );
};
