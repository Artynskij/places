import clsx from "clsx";

import {
    IconDone,
    IconEye,
    IconLike,
    IconStar,
} from "@/components/common/Icons";
import style from "./cardTravelList.module.scss";
import { IPersonTravelMarkFront, ISearchItemFront } from "@/lib/models";
import { TTravelMapAction } from "@/lib/models/types";
import TravelMapIcon from "../icon/TravelIcon";

interface IProp {
    current: IPersonTravelMarkFront | null;
    searchItem?: ISearchItemFront;
    handlerClickEye: (searchItemString: string) => void;
    handlerToggleIcon: ({
        type,
        searchItem,
        travelMark,
    }: {
        type: TTravelMapAction;
        searchItem?: ISearchItemFront;
        travelMark: IPersonTravelMarkFront | null;
    }) => void;
}
const CardTravelList = ({
    current,
    searchItem,
    handlerClickEye,
    handlerToggleIcon,
}: IProp) => {
    const countryName = searchItem?.location.country?.title;
    return (
        <>
            <div className={style.left}>
                <span>
                    {searchItem?.title ||
                        current?.location.title ||
                        "Отсутсвует имя"}
                    {countryName ? `, ${countryName}` : ""}
                </span>

                <TravelMapIcon
                    onClick={() => {
                        if (searchItem) {
                            handlerClickEye(searchItem.title);
                        }
                        if (current) {
                            handlerClickEye(current.location.title);
                        }
                    }}
                    type="watch"
                />
            </div>

            <div className={style.buttons}>
                <TravelMapIcon
                    onClick={() => {
                        handlerToggleIcon({
                            type: "visited",
                            searchItem,
                            travelMark: current || null,
                        });
                    }}
                    active={!!current?.isVisited}
                    type="visited"
                />

                <TravelMapIcon
                    onClick={() => {
                        handlerToggleIcon({
                            type: "loved",
                            searchItem,
                            travelMark: current || null,
                        });
                    }}
                    active={!!current?.isLoved}
                    type="loved"
                />
                <TravelMapIcon
                    onClick={() => {
                        handlerToggleIcon({
                            type: "wanted",
                            searchItem,
                            travelMark: current || null,
                        });
                    }}
                    active={!!current?.isWanted}
                    type="wanted"
                />
            </div>
        </>
    );
};
export default CardTravelList;
