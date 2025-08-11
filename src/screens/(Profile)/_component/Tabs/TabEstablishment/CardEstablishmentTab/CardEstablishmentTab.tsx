import { IconLocation, IconStar } from "@/components/common/Icons";
import style from "./cardEstablishmentTab.module.scss";

import { FC } from "react";
import { Button } from "@/components/UI/Button/Button";
import Image from "next/image";
import { IEstablishmentFront } from "@/lib/models";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";

interface ICardEstablishmentTab {
    establishment: IEstablishmentFront;
    editObjectText: string;
}
const CardEstablishmentTab: FC<ICardEstablishmentTab> = ({
    establishment,
    editObjectText,
}) => {
    return (
        <div className={style.card}>
            <div className={style.card_title}>
                <div className={style.card_title_left}>
                    <div className={style.card_title_rating}>
                        <IconStar className={style.card_title_rating_icon} />
                        {establishment.rates.count !== 0 ? (
                            <>
                                <span>{establishment.rates.main}</span>
                                <span>-</span>
                                <span>{establishment.rates.count} отзывов</span>
                            </>
                        ) : (
                            <div>Отзывов пока не было</div>
                        )}
                    </div>
                    <div className={style.card_title_text}>
                        {establishment.title}
                    </div>
                    <div className={style.card_title_location}>
                        <IconLocation
                            className={style.card_title_location_icon}
                        />
                        {`${establishment.location.town.title}`}
                    </div>
                </div>
                <div className={style.card_title_right}>
                    {/* <Button
                        className={style.card_title_button}
                        type="light"
                        text={editObjectText}
                        icon={<IconEdit className={style.card_title_icon} />}
                    /> */}
                </div>
            </div>
            <div className={style.card_img}>
                {establishment.media.gallery ? (
                    <Image
                        className={style.card_img_img}
                        src={establishment.media?.gallery[0].src}
                        alt={establishment.media.gallery[0].title}
                        width={establishment.media.gallery[0].width}
                        height={establishment.media.gallery[0].height}
                    />
                ) : (
                    <Image
                        className={style.card_img_img}
                        src={CONSTANT_DEFAULT_IMAGE_URL}
                        alt={"added est photo"}
                        width={500}
                        height={500}
                    />
                )}

                <div className={style.card_img_type}>
                    <Button text={establishment.category.value} />
                </div>
            </div>
        </div>
    );
};
export default CardEstablishmentTab;
