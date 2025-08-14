import { FC } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { IIcon } from "../type";
interface IIconLike extends IIcon {
    active?: boolean;
}

export const IconLike: FC<IIconLike> = ({
    className,
    active = false,
    style,
    onClick,
}) => {
    if (active) {
        return (
            <IoHeart style={style} onClick={onClick} className={className} />
        );
    } else {
        return (
            <IoMdHeartEmpty
                style={style}
                onClick={onClick}
                className={className}
            />
        );
    }
};
