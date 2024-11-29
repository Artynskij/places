import { IconClock } from "../Icons";
import style from "./blockFunctional.module.scss";

interface IBlockReadTime {
  text: string;
}
export const BlockReadTime = ({ text }: IBlockReadTime) => {
  const calcTimeRead = (text.split(" ").length / 130).toFixed(0);
  return (
    <div className={style.readTime}>
      <IconClock className={style.readTime_icon}/>
      Чтение: {calcTimeRead} мин
    </div>
  );
};
