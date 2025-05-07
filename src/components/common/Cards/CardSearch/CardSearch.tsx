import Image from "next/image";
import style from "./cardSearch.module.scss";
import { FC } from "react";
import { IEstablishmentFront, IMediaFront } from "@/lib/models";

interface ICardSearch {
    establishment: IEstablishmentFront;
}
export const CardSearch: FC<ICardSearch> = ({ establishment }) => {
    return (
        <div
            onMouseDown={() => {
                console.log("onMouse");
            }}
            className={style.card}
        >
            <div className={style.card_img}>
                <Image
                    src={`${establishment.media.cdnHost}/${establishment.media.gallery[0].blobPath}`}
                    alt={establishment.media.gallery[0].title || 'est card'}
                    sizes="10vw"
                    width={50}
                    height={50}
                />
            </div>
            <div className={style.card_info}>
                <h3 className={style.card_info_title}>{establishment.title}</h3>
                <div className={style.card_info_location}>{establishment.location.town.title}</div>
            </div>
        </div>
    );
};
