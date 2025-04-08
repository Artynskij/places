import { FC } from "react";
import { GoThumbsup } from "react-icons/go";
import { IIcon } from "../type";
interface IIconThumbUp extends IIcon {}
export const IconThumbUp: FC<IIconThumbUp> = ({
  className,
  style,
  onClick,
}) => {
  return <GoThumbsup style={style} onClick={onClick} className={className} />;
};
