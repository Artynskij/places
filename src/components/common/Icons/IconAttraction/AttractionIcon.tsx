import { IoChevronForward } from "react-icons/io5";
import style from "../icon.module.scss";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconAttraction extends IIcon {}
export const IconAttraction: FC<IIconAttraction> = ({ className, onClick, style }) => {
  return <IoChevronForward style={style} onClick={onClick} className={className} />;
};
