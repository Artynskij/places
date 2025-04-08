import { FC } from "react";
import { IoMdExit } from "react-icons/io";
import { IIcon } from "../type";
import styleIcon from "../icon.module.scss";

interface IIconExit extends IIcon {}
export const IconExit: FC<IIconExit> = ({ className, onClick, style }) => {
  return (
    <IoMdExit
      style={style}
      className={`${className} ${styleIcon.icon_exit}`}
      onClick={onClick}
    />
  );
};
