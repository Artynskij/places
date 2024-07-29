import { FC } from "react";
import { CiFilter } from "react-icons/ci";
import { IIcon } from "../type";

interface IIconFilter extends IIcon {}
export const IconFilter: FC<IIconFilter> = ({ className, style, onClick }) => {
  return <CiFilter style={style} onClick={onClick} className={className} />;
};
