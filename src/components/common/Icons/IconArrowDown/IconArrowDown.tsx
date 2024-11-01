import { FC } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IIcon } from "../type";

interface IIconArrowLeft extends IIcon {

}
export const IconArrowDown: FC<IIconArrowLeft> = ({ className, onClick, style }) => {
  return <MdKeyboardArrowDown style={style} className={className} onClick={onClick} />;
};
