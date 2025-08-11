import { Skeleton } from "antd";
import style from './tabEstablishment.module.scss'

const SkeletonTabEstablishment = () => {
    const inlineStyle = {
        width: "100%",
        height: "100%",
    };
    return (
        <>
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
        </>
    );
};
export default SkeletonTabEstablishment;
