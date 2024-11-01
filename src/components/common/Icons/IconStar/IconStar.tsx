import { FC } from "react";
import { MdOutlineStar } from "react-icons/md";
import { IIcon } from "../type";
interface IIconStar extends IIcon {}
export const IconStar: FC<IIconStar> = ({ className, style, onClick }) => {
  return (
    <MdOutlineStar style={style} onClick={onClick} className={className} />
  );
};
