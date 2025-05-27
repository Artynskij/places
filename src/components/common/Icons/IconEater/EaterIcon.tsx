import { IoRestaurantOutline } from "react-icons/io5";
import style from "../icon.module.scss";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconEater extends IIcon {}
export const IconEater: FC<IIconEater> = ({ className, onClick, style }) => {
  return <IoRestaurantOutline style={style} onClick={onClick} className={className} />;
};
