import { CiGlobe } from "react-icons/ci";
import { FC } from "react";
import { IIcon } from "../type";
interface IIconGlobe extends IIcon {}
export const IconGlobe: FC<IIconGlobe> = ({ className, onClick, style }) => {
  return <CiGlobe style={style} onClick={onClick} className={className} />;
};
