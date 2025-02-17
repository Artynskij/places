import { Skeleton } from "antd";
import style from "./sliderCommercial.module.scss";

export default function SkeletonRate ()  {
  const inlineStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_slide}>
        <Skeleton.Button
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
    </div>
  );
};
