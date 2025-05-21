import { FC } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { IIcon } from "../type";

interface IIconEnter extends IIcon {}
export const IconEnter: FC<IIconEnter> = ({ className, style, onClick }) => {
    return (
        <BsArrowDownRight style={style} onClick={onClick} className={className} />
    );
};
