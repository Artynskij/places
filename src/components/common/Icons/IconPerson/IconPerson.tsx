import { FC } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import styleIcon from '../icon.module.scss'
import { IIcon } from "../type";
interface IIconPerson extends IIcon {}
export const IconPerson: FC<IIconPerson> = ({ className, style, onClick }) => {
  return (
    <IoPersonCircleOutline  style={style} onClick={onClick} className={`${className} ${styleIcon.icon_person}`} />
  );
};
