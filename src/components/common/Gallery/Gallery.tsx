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

interface IGallery {
    images: IMediaFront[];
    titleEstablishment: string;
    cdnHost: string;
}
export const Gallery: FC<IGallery> = ({
    images,
    cdnHost,
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
        setTypeView('list')
        setAlbumActive(true);
    }
    function handlerOpenSlider(index: number){
        setActivePhotoIndex(index);
        setTypeView('slider')
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
                        <Image
                            priority
                            width={images[0].width}
                            height={images[0].height}
                            alt={images[0].title}
                            src={`${cdnHost}/${images[0].blobPath}`}
                        />
                    </div>
                    {images.slice(1, 3).map((item, index) => {
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
                                    src={`${cdnHost}/${item.blobPath}`}
                                />
                            </div>
                        );
                    })}
                </>
            ) : useMedia.isMobile || useMedia.isSmallMobile ? (
                <>
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
                                        src={`${cdnHost}/${item.blobPath}`}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </>
            ) : (
                <>
                    <div
                        onClick={() => handlerOpenSlider(0)}
                        className={style.image__main}
                    >
                        <Image
                            priority
                            width={images[0].width}
                            height={images[0].height}
                            alt={images[0].title}
                            src={`${cdnHost}/${images[0].blobPath}`}
                        />
                    </div>
                    {images.slice(1, 5).map((item, index) => {
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
                                    src={`${cdnHost}/${item.blobPath}`}
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
                    setActive={setAlbumActive}
                >
                    <AlbumPhoto
                        activePhotoIndex={activePhotoIndex}
                        setActivePhotoIndex={setActivePhotoIndex}
                        images={images}
                        cdnHost={cdnHost}
                        setTypeView={setTypeView}
                        typeView={typeView}
                    />
                </ModalCustom>
            )}
            <Button
                onClick={() => handlerOpenAlbum(0)}
                className={style.button_watchAll}
                text={`Еще ${images.length} фото`}
            />
        </div>
    );
};
