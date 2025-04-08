import { FC } from "react";
import { CiSettings } from "react-icons/ci";
import { IIcon } from "../type";
import styleIcon from '../icon.module.scss'
interface IIconSettings extends IIcon {}
export const IconSettings: FC<IIconSettings> = ({ className, style, onClick }) => {
  return <CiSettings style={style} onClick={onClick}  className={`${className} ${styleIcon.icon_settings}`} />;
};
