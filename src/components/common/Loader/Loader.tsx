import { Overlay } from "../Overlay/Overlay";
import style from "./loader.module.scss";

export const Loader = () => {
  return (
    <div>
      <div className={style.loader_block}>
        <div className={style.loader}></div>
      </div>
      {/* <Overlay /> */}
    </div>
  );
};
