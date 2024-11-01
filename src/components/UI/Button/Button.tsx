import { FC, ReactNode } from "react";
import style from "./Button.module.scss";

interface IButton {
  text: string;
  className?: string;
  type?: "light" | "blue";
  onClick?: () => void;
  icon?: ReactNode;
  typeLogic?: "button" | "reset" | "submit";
  inlineStyle?: React.CSSProperties;
  active?:boolean
}

export const Button: FC<IButton> = ({
  text,
  className,
  type,
  onClick,
  icon,
  typeLogic,
  inlineStyle,
  active
}) => {
  return (
    <button
      style={inlineStyle}
      type={typeLogic}
      onClick={onClick}
      className={`${
        type === "light" ? style.button_light : style.button
      } ${className} ${active && style.button_active}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
