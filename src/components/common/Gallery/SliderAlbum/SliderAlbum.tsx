"use client";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import style from "./sliderAlbum.module.scss";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";
// import { SkeletonSlider } from "./SkeletonSlider";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import Image from "next/image";
import { IconGallery } from "../../Icons";

interface ISliderAlbum {
  data: { src: string; width: number; height: number; alt: string }[];
  id: number;
  activePhotoIndex: number;
  setActivePhotoIndex: (item: number) => void;
  setTypeView: (type: "slider" | "list") => void;
}

export const SliderAlbum: FC<ISliderAlbum> = ({
  id,
  data,
  activePhotoIndex,
  setActivePhotoIndex,
  setTypeView,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const [sliderLoad, setSliderLoad] = useState<boolean>(false);

  const swiperRef = useRef<SwiperRef>(null);
  const swiperRefPagination = useRef<SwiperRef>(null);

  useEffect(() => {
    console.log(swiperRef);
  }, []);

  const settings: SwiperOptions = {
    modules: [FreeMode, Navigation, Thumbs],
    navigation: {
      prevEl: `#slider-${id}-prev`,
      nextEl: `#slider-${id}-next`,
      disabledClass: style.disable_arrow,
    },
    thumbs: { swiper: thumbsSwiper },
    slidesPerView: 1,
    spaceBetween: 10,
  };
  const settingsPagination: SwiperOptions = {
    modules: [FreeMode, Thumbs],
    spaceBetween: 10,
    slidesPerView: 7,
    freeMode: true,
    watchSlidesProgress: true,
  };
  return (
    <div className={style.slider_ctn}>
      <Swiper
        // onSlideChange={() => console.dir(swiperRef.current)}
        onSlideChange={(swiper: SwiperClass) => {
          setActivePhotoIndex(swiper.activeIndex);
        }}
        onSwiper={(swiper: SwiperClass) => {
          swiper.slideTo(activePhotoIndex);
          setSliderLoad(true);
        }}
        ref={swiperRef}
        onMouseDown={() => false}
        {...settings}
        style={{ width: "100%", height: "100%" }}
      >
        {sliderLoad ? (
          <>
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div key={index} className={style.album_slider_item}>
                  <Image
                    fill
                    className={style.album_slider_img}
                    src={item.src}
                    alt="test"
                  />
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Swiper>
      <div style={sliderLoad ? { display: "block" } : { display: "none" }}>
        <div id={`slider-${id}-prev`} className={style.arrow_prev}>
          <IconArrowLeft className={style.arrow_prev_icon} />
        </div>
        <div id={`slider-${id}-next`} className={style.arrow_next}>
          <IconArrowRight className={style.arrow_next_icon} />
        </div>
      </div>
      {/* Pagination */}
      <Swiper
        onSwiper={setThumbsSwiper}
        ref={swiperRefPagination}
        onMouseDown={() => false}
        {...settingsPagination}
        style={{ width: "100%", height: "100%" }}
      >
        {sliderLoad ? (
          <div className={style.pagination}>
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div key={index} className={style.pagination_bullet}>
                  <Image
                    fill
                    className={style.pagination_bullet_img}
                    src={item.src}
                    alt="test"
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
          //   <SkeletonSlider />
        )}
      </Swiper>
      <div className={style.button_back} onClick={() => setTypeView("list")}>
        <IconGallery className={style.button_back_icon} />
        <span>Галерея</span>
      </div>
    </div>
  );
};
