import { FC } from "react";
import { LuPlane } from "react-icons/lu";
import { IIcon } from "../type";

interface IIconPlane extends IIcon {}
export const IconPlane: FC<IIconPlane> = ({ className, style, onClick }) => {
    return <LuPlane style={style} onClick={onClick} className={className} />;
};
