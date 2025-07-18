import style from "./spanError.module.scss";

interface Prop {
    text?: string;
}
export const SpanErrorForm = ({ text = "required" }: Prop) => {
    return <span className={style.error}>{text}</span>;
};
