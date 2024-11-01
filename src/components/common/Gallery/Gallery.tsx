"use client";
import Image from "next/image";
import style from "./gallery.module.scss";
import { useSize } from "@/asset/hooks/useSize";
import { FC, useEffect, useState } from "react";
import { SkeletonGallery } from "./SkeletonGallery";
import { Slider } from "../Slider/Slider";
import { AlbumPhoto } from "./AlbumPhoto/AlbumPhoto";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";

interface IGallery {
  images: string[];
}
export const Gallery: FC<IGallery> = ({ images }) => {
  const [loadClient, setLoadClient] = useState(false);
  const [albumActive, setAlbumActive] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(-1);

  const sizeScreen = useSize();
  useEffect(() => {
    setLoadClient(true);
  }, []);
  function handlerOpenAlbum(index: number) {
    setAlbumActive(true);
    setActivePhotoIndex(index);
  }
  if (!loadClient) {
    return <SkeletonGallery />;
  }
  return (
    <div className={style.gallery}>
      {sizeScreen.isTablet ? (
        <>
          <div
            onClick={() => handlerOpenAlbum(0)}
            className={style.image__main}
          >
            <Image width={300} height={150} alt="img" src={images[0]} />
          </div>
          {images.slice(1, 3).map((item, index) => {
            return (
              <div
                onClick={() => handlerOpenAlbum(index)}
                key={index}
                className={style.image__additional}
              >
                <Image width={300} height={150} alt="img" src={item} />
              </div>
            );
          })}
        </>
      ) : sizeScreen.isMobile ? (
        <>
          <Slider id={1}>
            {images.map((item, index) => {
              return (
                <div
                  onClick={() => handlerOpenAlbum(index)}
                  key={index}
                  className={style.image__additional}
                >
                  <Image width={300} height={150} alt="img" src={item} />
                </div>
              );
            })}
          </Slider>
        </>
      ) : (
        <>
          <div onClick={() => handlerOpenAlbum(0)} className={style.image__main}>
            <Image width={300} height={150} alt="img" src={images[0]} />
          </div>
          {images.slice(1, 5).map((item, index) => {
            return (
              <div
                onClick={() =>{
                  
                  handlerOpenAlbum(index)}}
                key={index}
                className={style.image__additional}
              >
                <Image width={300} height={150} alt="img" src={item} />
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
          <AlbumPhoto activePhotoIndex={activePhotoIndex} setActivePhotoIndex={setActivePhotoIndex} imageUrls={images} />
        </ModalCustom>
      )}
    </div>
  );

  // if (sizeScreen.isTablet) {
  //   return (
  //     <div className={style.gallery}>
  //       <div className={style.image__main}>
  //         <Image width={300} height={150} alt="img" src={images[0]} />
  //       </div>
  //       {images.slice(1, 3).map((item, index) => {
  //         return (
  //           <div key={index} className={style.image__additional}>
  //             <Image width={300} height={150} alt="img" src={item} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
  // if (sizeScreen.isMobile) {
  //   return (
  //     <div>
  //       <Slider id={1}>
  //         {images.map((item, index) => {
  //           return (
  //             <div key={index} className={style.image__additional}>
  //               <Image width={300} height={150} alt="img" src={item} />
  //             </div>
  //           );
  //         })}
  //       </Slider>
  //     </div>
  //   );
  // }
  // // для компиков
  // return (
  //   <div className={style.gallery}>
  //     <div className={style.image__main}>
  //       <Image width={300} height={150} alt="img" src={images[0]} />
  //     </div>
  //     {images.slice(1, 5).map((item, index) => {
  //       return (
  //         <div key={index} className={style.image__additional}>
  //           <Image width={300} height={150} alt="img" src={item} />
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};
