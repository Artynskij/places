"use client";
import Image from "next/image";
import style from "./gallery.module.scss";
// import { useSize } from "@/asset/hooks/useSize";
import { FC, useEffect, useState } from "react";
import { SkeletonGallery } from "./SkeletonGallery";
import { Slider } from "../Slider/Slider";
import { AlbumPhoto } from "./AlbumPhoto/AlbumPhoto";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IApiImage } from "@/Api/IApi";
import Item from "antd/es/list/Item";

interface IGallery {
  images: IApiImage[];
  cdnHost: string;
}
export const Gallery: FC<IGallery> = ({ images, cdnHost }) => {
  const [loadClient, setLoadClient] = useState(false);
  const [albumActive, setAlbumActive] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(-1);

  const useMedia = useSelector((state: RootState) => state.screenSize);
  useEffect(() => {
    setLoadClient(true);
  }, []);
  function handlerOpenAlbum(index: number) {
    setActivePhotoIndex(index);
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
              alt={images[0].details[0].value.title}
              src={`${cdnHost}/${images[0].blobPath}`}
            />
          </div>
          {images.slice(1, 3).map((item, index) => {
            return (
              <div
                onClick={() => handlerOpenAlbum(index + 1)}
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
            onClick={() => handlerOpenAlbum(0)}
            className={style.image__main}
          >
            <Image
              priority
              width={images[0].width}
              height={images[0].height}
              alt={images[0].details[0].value.title}
              src={`${cdnHost}/${images[0].blobPath}`}
            />
          </div>
          {images.slice(1, 5).map((item, index) => {
            return (
              <div
                onClick={() => {
                  handlerOpenAlbum(index + 1);
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
          title="ObjectName"
          view="over"
          active={albumActive}
          setActive={setAlbumActive}
        >
          <AlbumPhoto
            activePhotoIndex={activePhotoIndex}
            setActivePhotoIndex={setActivePhotoIndex}
            imagesProp={images}
            cdnHost={cdnHost}
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
