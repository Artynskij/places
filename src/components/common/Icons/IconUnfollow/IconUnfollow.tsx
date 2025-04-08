import { FC } from "react";
import { SlUserUnfollow } from "react-icons/sl";
import { IIcon } from "../type";
interface IIconUnfollow extends IIcon {}
export const IconUnfollow: FC<IIconUnfollow> = ({
  className,
  style,
  onClick,
}) => {
  return <SlUserUnfollow  style={style} onClick={onClick} className={className} />;
};
