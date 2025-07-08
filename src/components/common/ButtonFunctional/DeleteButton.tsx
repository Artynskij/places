"use client";
import style from "./buttonFunctional.module.scss";

import { IconDelete } from "../Icons";
interface IDeleteButton {
    onClick: () => void;
}
export const DeleteButton = ({ onClick }: IDeleteButton) => {
    return <IconDelete className={style.delete} onClick={onClick} />;
};
