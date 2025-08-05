"use client";
import Image from "next/image";
import style from "./gallery.module.scss";

import { FC, useEffect, useState } from "react";
import { SkeletonGallery } from "./SkeletonGallery";
import { Slider } from "../Slider/Slider";
import { AlbumPhoto } from "./AlbumPhoto/AlbumPhoto";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { IMediaFront } from "@/lib/models";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";

interface IGallery {
    images: IMediaFront[] | null;
    titleEstablishment: string;
}
export const Gallery: FC<IGallery> = ({
    images,

    titleEstablishment,
}) => {
    const [loadClient, setLoadClient] = useState(false);
    const [albumActive, setAlbumActive] = useState(false);
    const [activePhotoIndex, setActivePhotoIndex] = useState(-1);
    const [typeView, setTypeView] = useState<"slider" | "list">("list");

    const useMedia = useSelector((state: RootState) => state.screenSize);
    useEffect(() => {
        setLoadClient(true);
    }, []);
    function handlerOpenAlbum(index: number) {
        setActivePhotoIndex(index);
        setTypeView("list");
        setAlbumActive(true);
    }
    function handlerOpenSlider(index: number) {
        setActivePhotoIndex(index);
        setTypeView("slider");
        setAlbumActive(true);
    }
    if (!loadClient) {
        return <SkeletonGallery />;
    }
    return (
        <div className={style.gallery}>
            {useMedia.isTablet ? (
                <>
                    <div
                        onClick={() => handlerOpenAlbum(0)}
                        className={style.image__main}
                    >
                        {images && images[0] ? (
                            <Image
                                priority
                                width={images[0].width}
                                height={images[0].height}
                                alt={images[0].title}
                                src={images[0].src}
                            />
                        ) : (
                            <Image
                                priority
                                width={500}
                                height={500}
                                alt={"main image gallery"}
                                src={CONSTANT_DEFAULT_IMAGE_URL}
                            />
                        )}
                    </div>
                    {images &&
                        images[0] &&
                        images.slice(1, 3).map((item, index) => {
                            return (
                                <div
                                    onClick={() => handlerOpenSlider(index + 1)}
                                    key={index}
                                    className={style.image__additional}
                                >
                                    <Image
                                        width={item.width}
                                        height={item.height}
                                        alt="img"
                                        src={item.src}
                                    />
                                </div>
                            );
                        })}
                </>
            ) : useMedia.isMobile || useMedia.isSmallMobile ? (
                <>
                    {images && images[0] && (
                        <Slider id={1}>
                            {images.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => handlerOpenAlbum(index)}
                                        key={index}
                                        className={style.image__additional}
                                    >
                                        <Image
                                            width={item.width}
                                            height={item.height}
                                            alt="img"
                                            src={item.src}
                                        />
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </>
            ) : (
                <>
                    <div
                        onClick={() => handlerOpenSlider(0)}
                        className={style.image__main}
                    >
                        {images && images[0] ? (
                            <Image
                                priority
                                width={images[0].width}
                                height={images[0].height}
                                alt={images[0].title}
                                src={images[0].src}
                            />
                        ) : (
                            <Image
                                priority
                                width={500}
                                height={500}
                                alt={"main image gallery"}
                                src={CONSTANT_DEFAULT_IMAGE_URL}
                            />
                        )}
                    </div>
                    {images &&
                        images[0] &&
                        images.slice(1, 5).map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        handlerOpenSlider(index + 1);
                                    }}
                                    key={index}
                                    className={style.image__additional}
                                >
                                    <Image
                                        width={item.width}
                                        height={item.height}
                                        alt="img"
                                        src={item.src}
                                    />
                                </div>
                            );
                        })}
                </>
            )}
            {albumActive && (
                <ModalCustom
                    title={titleEstablishment}
                    view="over"
                    active={albumActive}
                    closeModal={() => setAlbumActive(false)}
                >
                    {images && images[0] ? (
                        <AlbumPhoto
                            activePhotoIndex={activePhotoIndex}
                            setActivePhotoIndex={setActivePhotoIndex}
                            images={images}
                           
                            setTypeView={setTypeView}
                            typeView={typeView}
                        />
                    ) : (
                        <div>К сожалению фотографий нету</div>
                    )}
                </ModalCustom>
            )}
            {images && images[0] && (
                <Button
                    onClick={() => handlerOpenAlbum(0)}
                    className={style.button_watchAll}
                    text={`Еще ${images.length} фото`}
                />
            )}
        </div>
    );
};
