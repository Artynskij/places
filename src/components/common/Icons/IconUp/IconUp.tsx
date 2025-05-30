import { FC } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IIcon } from "../type";
interface IIconUp extends IIcon {}
export const IconUp: FC<IIconUp> = ({ className, style, onClick }) => {
    return (
        <FaArrowUp  style={style} onClick={onClick} className={className} />
    );
};
