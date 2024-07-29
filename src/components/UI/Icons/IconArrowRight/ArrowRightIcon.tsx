import { IoChevronForward } from "react-icons/io5";
import style from "../icon.module.scss";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconArrowRight extends IIcon {}
export const IconArrowRight: FC<IIconArrowRight> = ({ className, onClick, style }) => {
  return <IoChevronForward style={style} onClick={onClick} className={className} />;
};
