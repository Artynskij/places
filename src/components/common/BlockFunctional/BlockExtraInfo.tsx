import style from "./blockFunctional.module.scss";
import clsx from "clsx";

interface BlockExtraInfoProps {
    text: string;
    variant?: "info" | "success" | "error";
    fontSize?: "12" | "14" | "16";
}

export const BlockExtraInfo = ({
    text,
    variant = "info",
    fontSize = '12'
}: BlockExtraInfoProps) => {
    return (
        <p className={clsx(style.extraInfo, style[`extraInfo--${variant}`],style[`extraInfo--${fontSize}`])}>
            {text}
        </p>
    );
};
