import { FC } from "react";
import { FaEye } from "react-icons/fa";
import { IIcon } from "../type";

interface IIconEye extends IIcon {}
export const IconEye: FC<IIconEye> = ({ className, onClick, style }) => {
  return <FaEye  style={style} className={className} onClick={onClick} />;
};
