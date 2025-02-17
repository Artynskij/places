"use client";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Gallery as GridGallery,
  ThumbnailImageComponentImageProps,
} from "react-grid-gallery";
import style from "./albumPhoto.module.scss";
import Image from "next/image"; // Импортируем компонент Image
import { SliderAlbum } from "../SliderAlbum/SliderAlbum";
import { IImageData } from "@/models/IType";
import { IApiImage } from "@/Api/IApi";

interface IAlbumPhoto {
  imagesProp: IApiImage[];
  cdnHost: string;
  activePhotoIndex: number;
  setActivePhotoIndex: (item: number) => void;
}

export const AlbumPhoto: FC<IAlbumPhoto> = ({
  imagesProp,
  cdnHost,
  activePhotoIndex,
  setActivePhotoIndex,
}) => {
  const [typeView, setTypeView] = useState<"slider" | "list">("list");

  // Используем реф для хранения загруженных изображений

  const activeImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeView === "list") {
      setTimeout(() => {
        if (activeImageRef.current) {
          activeImageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [typeView]);

  const ImageComponent = ({
    imageProps,
  }: {
    imageProps: ThumbnailImageComponentImageProps;
  }) => {
    return (
      <div
        onClick={() => {
          setActivePhotoIndex(+imageProps.key);
          setTypeView("slider");
        }}
        ref={+imageProps.key === activePhotoIndex ? activeImageRef : null}
        className={`${style.album_item} ${
          imageProps.key === activePhotoIndex && style.activePhoto
        }`}
      >
        <Image
          className={`${style.album_img} `}
          src={imageProps.src}
          alt={imageProps.alt || "no alt"}
          width={300}
          height={150}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <>
      {typeView === "list" ? (
        <GridGallery
          enableImageSelection={false}
          images={imagesProp.map((item) => {
            return {
              height: item.height,
              width: item.width,
              src: `${cdnHost}/${item.blobPath}`,
              alt: item.details[0].value.title,
            };
          })}
          thumbnailImageComponent={ImageComponent}
        />
      ) : (
        <>
          <SliderAlbum
            activePhotoIndex={activePhotoIndex}
            setActivePhotoIndex={setActivePhotoIndex}
            setTypeView={setTypeView}
            data={imagesProp}
            cdnHost={cdnHost}
            id={1}
          />
        </>
      )}
    </>
  );
};
