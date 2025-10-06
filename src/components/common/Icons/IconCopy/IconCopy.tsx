import { FC } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IIcon } from "../type";

interface IIconCopy extends IIcon {}
export const IconCopy: FC<IIconCopy> = ({ className, onClick, style }) => {
    return <FaRegCopy  style={style} className={className} onClick={onClick} />;
};
