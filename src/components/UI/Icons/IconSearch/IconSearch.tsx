import { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IIcon } from "../type";
interface IIconSearch extends IIcon {}
export const IconSearch: FC<IIconSearch> = ({ className, style, onClick }) => {
  return <IoSearchOutline style={style} onClick={onClick}  className={className} />;
};
