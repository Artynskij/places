"use client";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Gallery as GridGallery,
  ThumbnailImageComponentImageProps,
} from "react-grid-gallery";
import style from "./albumPhoto.module.scss";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import Image from "next/image"; // Импортируем компонент Image
import { SliderAlbum } from "../SliderAlbum/SliderAlbum";
import { IconArrowLeft, IconGallery } from "../../Icons";
import { IImageData } from "@/types/IType";

interface IAlbumPhoto {
  imageUrls: string[];
  activePhotoIndex: number;
  setActivePhotoIndex: (item: number) => void;
}

export const AlbumPhoto: FC<IAlbumPhoto> = ({
  imageUrls,
  activePhotoIndex,
  setActivePhotoIndex,
}) => {
  const [images, setImages] = useState<IImageData[]>([]);

  const [typeView, setTypeView] = useState<"slider" | "list">("list");

  // Используем реф для хранения загруженных изображений
  const loadedImagesRef = useRef<IImageData[]>([]);
  const activeImageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      if (loadedImagesRef.current.length === 0) {
        try {
          const fetchedImages = await Promise.all(
            imageUrls.map(
              (url) =>
                new Promise<IImageData>((resolve, reject) => {
                  const img = new window.Image();
                  img.src = url; // Загружаем изображение
                  img.onload = () => {
                    resolve({
                      src: url,
                      width: img.width || 300,
                      height: img.height || 150,
                      alt: "Description",
                    });
                  };
                  img.onerror = (err) => reject(err);
                })
            )
          );
          loadedImagesRef.current = fetchedImages; // Сохраняем загруженные изображения в реф
          setImages(fetchedImages); // Устанавливаем загруженные изображения в состояние
        } catch (error) {
          console.error("Ошибка загрузки изображений:", error);
        }
      } else {
        setImages(loadedImagesRef.current); // Если изображения уже загружены, просто устанавливаем их в состояние
      }
    };

    fetchImages();
  }, [imageUrls]);

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
          alt={imageProps.alt || ""}
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
          images={images}
          thumbnailImageComponent={ImageComponent}
        />
      ) : (
        <>
          <SliderAlbum
            activePhotoIndex={activePhotoIndex}
            setActivePhotoIndex={setActivePhotoIndex}
            setTypeView={setTypeView}
            data={images}
            id={1}
          />
        </>
      )}
    </>
  );
};
