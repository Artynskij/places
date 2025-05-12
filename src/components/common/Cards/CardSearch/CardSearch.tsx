import Image from "next/image";
import style from "./cardSearch.module.scss";
import { FC } from "react";
import { IEstablishmentFront, IMediaFront, ISearchItemFront } from "@/lib/models";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

interface ICardSearch {
    dataCard: ISearchItemFront;
}
export const CardSearch: FC<ICardSearch> = ({ dataCard }) => {
    return (
        <div
            onMouseDown={() => {
                console.log("onMouse");
            }}
            className={style.card}
        >
            <div className={style.card_img}>
                <Image
                    src={dataCard.media? `${dataCard.media?.cdnHost}/${dataCard.media?.mainImage.blobPath}` :'/mock/restMock.jpg'}
                    alt={dataCard.media?.mainImage.title || "searchItem card"}
                    sizes="10vw"
                    width={50}
                    height={50}
                />
            </div>
            <div className={style.card_info}>
                <h3 className={style.card_info_title}>{dataCard.title}</h3>
                {/* <Link
                    href={ROUTES.LOCATION.LOCATION(dataCard.location.town.id)}
                >
                    <div className={style.card_info_location}>
                        {dataCard.location.town.title}
                    </div>
                </Link> */}
            </div>
        </div>
    );
};
