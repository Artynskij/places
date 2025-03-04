"use client";
import { FC, useRef, useState } from "react";
import style from "./sliderCommercial.module.scss";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";
import { SkeletonSlider } from "./SkeletonSliderCommercial";
interface ISlider {
  id: number;
  children: React.ReactNode[] | React.ReactNode[];
}

const SliderCommercial: FC<ISlider> = ({ id, children }) => {
  const [sliderLoad, setSliderLoad] = useState<boolean>(false);

  const swiperRef = useRef<SwiperRef>(null);

  const settings: SwiperOptions = {
    modules: [Navigation, Autoplay, Pagination],
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },

    navigation: {
      prevEl: `#slider-${id}-prev`,
      nextEl: `#slider-${id}-next`,

      disabledClass: style.disable_arrow,
    },
    pagination: {
      clickable: true,
      el: `#slider-${id}-pagination`,
      renderBullet: function (index, className) {
        return `<span class="${className} ${style.pagination_bullet}"></span>`;
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

        // navigation
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
        <div className={style.pagination} id={`slider-${id}-pagination`}></div>
      </div>
    </div>
  );
};

export default SliderCommercial;
