import { Skeleton } from "antd";
import style from "./slider.module.scss";

export const SkeletonSlider = () => {
  const inlineStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_slide}>
        <Skeleton.Image
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Image
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Image
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_button}
          active={true}
        />
      </div>
    </div>
  );
};
