import { PiBinocularsLight } from "react-icons/pi";
import style from "../icon.module.scss";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconAttraction extends IIcon {}
export const IconAttraction: FC<IIconAttraction> = ({ className, onClick, style }) => {
  return <PiBinocularsLight style={style} onClick={onClick} className={className} />;
};
