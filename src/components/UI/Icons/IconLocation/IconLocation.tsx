import { FC } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IIcon } from "../type";
interface IIconLocation extends IIcon {
  
}
export const IconLocation: FC<IIconLocation> = ({ className, style, onClick }) => {
  return <IoLocationOutline style={style} onClick={onClick} className={className} />;
};
