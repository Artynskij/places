import { Skeleton } from "antd";
import style from "./skeleton.module.scss";

export const SkeletonSliderCommercial = () => {
    const inlineStyle = {
        width: "100%",
        height: "100%",
    };
    return (
        <div className={style.skeleton_slider_commercial}>
            <div className={style.skeleton_slider_commercial_slide}>
                <Skeleton.Image
                    rootClassName={style.skeleton_slider_commercial_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
        </div>
    );
};
