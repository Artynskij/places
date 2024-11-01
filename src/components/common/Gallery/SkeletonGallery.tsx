import { Skeleton } from "antd";
import style from "./gallery.module.scss";

export const SkeletonGallery = () => {
  const inlineStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_slide}>
        <Skeleton.Input
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Input
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Input
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Input
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
      <div className={style.skeleton_slide}>
        <Skeleton.Input
          rootClassName={style.skeleton_image}
          style={inlineStyle}
          active={true}
        />
      </div>
    
    </div>
  );
};
