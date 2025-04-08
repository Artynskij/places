import { Skeleton } from "antd";
import style from "./rate.module.scss";

export default function SkeletonRate ()  {
  const inlineStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_block}>
        <Skeleton.Button
          rootClassName={style.skeleton_button}
          style={inlineStyle}
          active={true}
        />
      </div>
    </div>
  );
};
