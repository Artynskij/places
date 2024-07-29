import { FC } from "react";
import style from "./Button.module.scss";
import { IconCancel } from "../Icons/IconCancel/IconCancel";

interface IButton {
 
  className?: string;
  onClick?: () => void;
}
export const ButtonClose: FC<IButton> = ({  className, onClick }) => {
  return (
    <button onClick={onClick} className={className + ` ${style.button_close}`}>
      <IconCancel className={style.button_close_icon} />
    </button>
  );
};
