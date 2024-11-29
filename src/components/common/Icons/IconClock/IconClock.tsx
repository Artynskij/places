import { FC } from "react";
import { CiClock1 } from "react-icons/ci";
import { IIcon } from "../type";

interface IIconClock extends IIcon {}
export const IconClock: FC<IIconClock> = ({ className, onClick, style }) => {
  return <CiClock1  style={style} className={className} onClick={onClick} />;
};
