import { FC } from "react";
import { BiMessageMinus } from "react-icons/bi";

import { IIcon } from "../type";
interface IIconMessage extends IIcon {}
export const IconMessage: FC<IIconMessage> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <BiMessageMinus style={style} onClick={onClick} className={className} />
  );
};
