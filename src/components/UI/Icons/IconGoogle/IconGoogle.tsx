import { FaGoogle } from "react-icons/fa";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconGoogle extends IIcon {}
export const IconGoogle: FC<IIconGoogle> = ({ className, onClick, style }) => {
  return <FaGoogle style={style} onClick={onClick} className={className} />;
};
