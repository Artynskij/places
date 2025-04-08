import { FC } from "react";
import { SlUserFollowing } from "react-icons/sl";
import { IIcon } from "../type";

interface IIconFollowing extends IIcon {}
export const IconFollowing: FC<IIconFollowing> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <SlUserFollowing style={style} onClick={onClick} className={className} />
  );
};
