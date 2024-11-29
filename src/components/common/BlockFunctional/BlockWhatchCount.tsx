import { IconEye } from "../Icons";
import style from "./blockFunctional.module.scss";

interface IBlockWatchCount {
  count: number | string;
}
export const BlockWatchCount = ({ count }: IBlockWatchCount) => {
  return (
    <div className={style.watchCount}>
      <IconEye className={style.watchCount_icon} />
      {count}.
    </div>
  );
};
