import { Skeleton } from "antd";
import style from "./skeleton.module.scss";

export const SkeletonGallery = () => {
    const inlineStyle = {
        width: "100%",
        height: "100%",
    };
    return (
        <div className={style.skeleton_gallery}>
            <div className={style.skeleton_gallery_slide}>
                <Skeleton.Input
                    rootClassName={style.skeleton_gallery_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
            <div className={style.skeleton_gallery_slide}>
                <Skeleton.Input
                    rootClassName={style.skeleton_gallery_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
            <div className={style.skeleton_gallery_slide}>
                <Skeleton.Input
                    rootClassName={style.skeleton_gallery_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
            <div className={style.skeleton_gallery_slide}>
                <Skeleton.Input
                    rootClassName={style.skeleton_gallery_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
            <div className={style.skeleton_gallery_slide}>
                <Skeleton.Input
                    rootClassName={style.skeleton_gallery_image}
                    style={inlineStyle}
                    active={true}
                />
            </div>
        </div>
    );
};
