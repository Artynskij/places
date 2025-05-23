"use client";
import { FC, Suspense, useRef, useState } from "react";
import style from "./slider.module.scss";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";
import { SkeletonSlider } from "./SkeletonSlider";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";


interface ISlider {
  // data?: IDataCardSlider[];
  id: number;
  children: React.ReactNode[] ;
}

export const Slider: FC<ISlider> = ({ id, children }) => {
 
  const [sliderLoad, setSliderLoad] = useState<boolean>(false);

  const swiperRef = useRef<SwiperRef>(null);

  const settings: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1.3,

    // loadOnTransitionStart: true, // Опционально: загружает изображения при начале перехода

    // loadPrevNext: true, // Опционально: загружает изображения для предыдущего и следующего слайдов

    spaceBetween: 10,
    navigation: {
      prevEl: `#slider-${id}-prev`,
      nextEl: `#slider-${id}-next`,
      disabledClass: style.disable_arrow,
    },
    breakpoints: {
      [CONSTANTS_SCREENS.SCREEN_NETBOOK]: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
      [CONSTANTS_SCREENS.SCREEN_PHONE]: {
        slidesPerView: 2.2,
        spaceBetween: 8,
      },
    },
  };

  return (
    <div className={style.slider_ctn}>
      <Swiper
        // onSlideChange={() => console.dir(swiperRef.current)}
        onSwiper={(swiper: any) => setSliderLoad(true)}
        ref={swiperRef}
        {...settings}
        onMouseDown={() => false}
      >
        {sliderLoad ? (
          <>
            {children?.length
              ? children?.map((item, index) => {
                  return <SwiperSlide key={index}>{item}</SwiperSlide>;
                })
              : children}
          </>
        ) : (
          <SkeletonSlider />
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
    </div>
  );
};
