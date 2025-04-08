import { FC } from "react";
import { GoThumbsdown } from "react-icons/go";
import { IIcon } from "../type";
interface IIconThumbDown extends IIcon {}
export const IconThumbDown: FC<IIconThumbDown> = ({
  className,
  style,
  onClick,
}) => {
  return <GoThumbsdown style={style} onClick={onClick} className={className} />;
};
