import { Skeleton } from "antd";
import style from './skeleton.module.scss'

export default function SkeletonRate ()  {
  const inlineStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className={style.skeleton_rate}>
      <div className={style.skeleton_rate_block}>
        <Skeleton.Button
          rootClassName={style.skeleton_rate_button}
          style={inlineStyle}
          active={true}
        />
      </div>
    </div>
  );
};
