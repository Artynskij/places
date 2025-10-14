import { Skeleton } from "antd";
import style from "./tabPhoto.module.scss";
const inlineStyle = {
  width: "100%",
  height: "100%",
};
const SkeletonTabPhoto = () => {
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_block}>
        <Skeleton.Image
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>
      <div className={style.skeleton_block}>
        <Skeleton.Image
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>

      <div className={style.skeleton_block}>
        <Skeleton.Image
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>
    </div>
  );
};

export default SkeletonTabPhoto;
