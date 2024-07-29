import { FiPlus } from "react-icons/fi";

import { FC } from "react";

import { IIcon } from "../type";
interface IIconPlus extends IIcon {}
export const IconPlus: FC<IIconPlus> = ({ className, style, onClick }) => {
  return <FiPlus style={style} onClick={onClick} className={className} />;
};
