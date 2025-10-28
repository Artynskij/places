import { IconClock } from "../Icons";
import style from "./blockFunctional.module.scss";

interface IBlockReadTime {
    text?: string;
    count?: number;
}
export const BlockReadTime = ({ text, count = 0 }: IBlockReadTime) => {
    const calcITypeEstablishmentEntity = count
        ? count
        : text
        ? (text?.split(" ").length / 130).toFixed(0)
        : "нету времени";
    return (
        <div className={style.readTime}>
            <IconClock className={style.readTime_icon} />
            Чтение: {calcITypeEstablishmentEntity} мин
        </div>
    );
};
