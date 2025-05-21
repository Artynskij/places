import Image from "next/image";
import style from "./cardSearch.module.scss";
import { FC } from "react";
import { ISearchItemFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import Link from "next/link";

interface ICardSearch {
    dataCard: ISearchItemFront;
    showDescription?: boolean;
}
export const CardSearch: FC<ICardSearch> = ({
    dataCard,
    showDescription = false,
}) => {
    return (
        <div className={style.card}>
            <div className={style.card_img}>
                <Image
                    src={
                        dataCard.media
                            ? `${dataCard.media?.cdnHost}/${dataCard.media?.mainImage}`
                            : "/mock/restMock.jpg"
                    }
                    alt={"searchItem card"}
                    sizes="10vw"
                    width={50}
                    height={66}
                    loading="lazy"
                />
            </div>
            <div className={style.card_info}>
                <h3 className={style.card_info_title}>{dataCard.title}</h3>
                {showDescription && (
                    <div className={style.card_info_description}>
                        {dataCard.description}
                    </div>
                )}

                {/* <div>{dataCard.globalTypeEntity}</div> */}
                {dataCard.location?.town && dataCard.location?.country   && (
                    <Link
                        href={ROUTES.LOCATION.LOCATION(dataCard.location?.town.id)}
                    >
                        <div className={style.card_info_location}>
                            {dataCard.location?.country.title}, {dataCard.location.town.title}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};
