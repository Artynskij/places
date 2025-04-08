import { FC } from "react";
import { SlUserFollow } from "react-icons/sl";
import { IIcon } from "../type";

interface IIconFollow extends IIcon {}
export const IconFollow: FC<IIconFollow> = ({ className, style, onClick }) => {
  return <SlUserFollow  style={style} onClick={onClick} className={className} />;
};
