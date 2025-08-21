import {
    IconDone,
    IconEye,
    IconLike,
    IconPlane,
    IconStar,
} from "@/components/common/Icons";
import { TTravelMapAction } from "@/lib/models/types";
import clsx from "clsx";
import style from "./travelIcon.module.scss";

interface IProp {
    type: TTravelMapAction;
    active?: boolean;
    onClick?: () => void;
}
const TravelMapIcon = ({ type, active = false, onClick }: IProp) => {
    return (
        <>
            {type === "watch" && (
                // <IconLike
                //     onClick={onClick}
                //     active={active}
                //     className={clsx(
                //         style.iconLike,
                //         active && style.iconLike_active
                //     )}

                // />
                <IconEye onClick={onClick} className={style.iconEye} />
            )}
            {type === "loved" && (
                <IconLike
                    onClick={onClick}
                    active={active}
                    className={clsx(
                        style.iconLike,
                        active && style.iconLike_active
                    )}
                />
            )}
            {type === "visited" && (
                <IconDone
                    onClick={onClick}
                    className={clsx(
                        style.iconVisited,
                        active && style.iconVisited_active
                    )}
                />
            )}
            {type === "wanted" && (
                <IconPlane
                    onClick={onClick}
                    className={clsx(
                        style.iconWanted,
                        active && style.iconWanted_active
                    )}
                />
            )}
        </>
    );
};
export default TravelMapIcon;
