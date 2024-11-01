"use client";
import { FC, useRef, useState } from "react";
import style from "./sliderFilterPage.module.scss";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";

import { IDataCardSliderFilter } from "@/types/ICards";

import { IconArrowRight, IconArrowLeft } from "@/components/common/Icons";

import { Loader } from "@/components/common/Loader/Loader";
import { SkeletonSliderFilter } from "./SkeletonSliderFilter";
import { CardSliderFilter } from "@/components/common/Cards";

interface ISlider {
  data: IDataCardSliderFilter[];
  id: number;
  nameSlider: string;
}

export const SliderFilterComponent: FC<ISlider> = ({
  data,
  id,
  nameSlider,
}) => {
  const [sliderLoad, setSliderLoad] = useState<boolean>(false);

  const swiperRef = useRef<SwiperRef>(null);

  const settings: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 2,
    spaceBetween: 8,
    navigation: {
      prevEl: `#slider-${id}-prev`,
      nextEl: `#slider-${id}-next`,

      disabledClass: style.disable_arrow,
    },
    breakpoints: {
      1000: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
    },
  };

  return (
    <>
      <div className={style.slider_ctn}>
        <div className={style.slider_title}>
          <h3>{nameSlider}</h3>
          <div className={style.slider_arrows}>
            <div id={`slider-${id}-prev`} className={style.arrow_prev}>
              <IconArrowLeft className={style.arrow_prev_icon} />
            </div>
            <div id={`slider-${id}-next`} className={style.arrow_next}>
              <IconArrowRight className={style.arrow_next_icon} />
            </div>
          </div>
        </div>

        <Swiper
          onSlideChange={() => console.dir(swiperRef.current)}
          onSwiper={(swiper: any) => setSliderLoad(true)}
          ref={swiperRef}
          {...settings}
          onMouseDown={() => false}
          // navigation
        >
          {sliderLoad ? (
            <>
              {data.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <CardSliderFilter {...item} />
                  </SwiperSlide>
                );
              })}
            </>
          ) : (
            <SkeletonSliderFilter />
          )}
        </Swiper>
      </div>

      {!sliderLoad ? <Loader /> : ""}
    </>
  );
};
