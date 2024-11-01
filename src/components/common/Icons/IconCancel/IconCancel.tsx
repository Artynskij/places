import { FC } from "react";
import { MdOutlineClear } from "react-icons/md";
import { IIcon } from "../type";

interface IIconCancel extends IIcon {}
export const IconCancel: FC<IIconCancel> = ({ className, onClick, style }) => {
  return <MdOutlineClear style={style} className={className} onClick={onClick} />;
};
