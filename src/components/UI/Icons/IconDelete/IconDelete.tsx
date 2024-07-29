import { FC } from "react";
import { MdDeleteForever  } from "react-icons/md";
import { IIcon } from "../type";

interface IIconDelete extends IIcon {}
export const IconDelete: FC<IIconDelete> = ({ className, onClick, style }) => {
  return <MdDeleteForever  style={style} className={className} onClick={onClick} />;
};
