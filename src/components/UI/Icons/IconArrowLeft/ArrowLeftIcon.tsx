import { IoIosArrowBack } from "react-icons/io";

import { FC } from "react";
import { IIcon } from "../type";
interface IIconArrowLeft extends IIcon {
  
}
export const IconArrowLeft: FC<IIconArrowLeft> = ({ className, onClick, style }) => {
  return <IoIosArrowBack style={style} onClick={onClick} className={className} />;
};
