import { FC } from "react";
import { RiGalleryView2 } from "react-icons/ri";
import { IIcon } from "../type";

interface IIconGallery extends IIcon {}
export const IconGallery: FC<IIconGallery> = ({ className, style, onClick }) => {
  return <RiGalleryView2 style={style} onClick={onClick} className={className} />;
};
