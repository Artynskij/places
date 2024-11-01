import { FC } from "react";

import { IIcon } from "../type";
import { FiShare2 } from "react-icons/fi";
interface IIconShare extends IIcon {}
export const IconShare: FC<IIconShare> = ({ className, style, onClick }) => {
  return <FiShare2 style={style} onClick={onClick} className={className} />;
};
