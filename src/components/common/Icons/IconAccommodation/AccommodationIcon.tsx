import { IoBedOutline } from "react-icons/io5";
import style from "../icon.module.scss";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconAccommodation extends IIcon {}
export const IconAccommodation: FC<IIconAccommodation> = ({ className, onClick, style }) => {
  return <IoBedOutline style={style} onClick={onClick} className={className} />;
};
