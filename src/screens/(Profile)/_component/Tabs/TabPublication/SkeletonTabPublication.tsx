import { Skeleton } from "antd";
import style from "./tabPublication.module.scss";
const inlineStyle = {
  width: "100%",
  height: "100%",
};
const SkeletonTabPublication = () => {
  return (
    <div className={style.skeleton}>
      <div className={style.skeleton_block}>
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>
      <div className={style.skeleton_block}>
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>

      <div className={style.skeleton_block}>
        <Skeleton.Input
          style={inlineStyle}
          rootClassName={style.skeleton_input}
          active={true}
        />
      </div>
    </div>
  );
};

export default SkeletonTabPublication;
