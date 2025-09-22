"use client";

import style from "./sliderView.module.scss";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";

import Image from "next/image";
import clsx from "clsx";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";

interface Props {
  node: any; // json из data-node
}

export const SliderViewer = ({ node }: Props) => {
  const [sliderLoad, setSliderLoad] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    if (prevRef.current && nextRef.current) {
      // @ts-ignore
      swiper.params.navigation.prevEl = prevRef.current;
      // @ts-ignore
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }

    setSliderLoad(true);
  };

  const images = node?.content?.map((item: any) => item.attrs) || [];

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      // @ts-ignore
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      // @ts-ignore
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className={style.slider_ctn}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={10}
        onSwiper={handleSwiper}
      >
        {sliderLoad ? (
          <>
            {images.map((img: any, i: number) => (
              <SwiperSlide key={i}>
                <div className={clsx(style.slide_ctn, style.sliderImage)}>
                  <Image
                    className={style.sliderImage_img}
                    src={img.src}
                    alt={img.alt || `slide-${i}`}
                    width={img.width || 800}
                    height={img.height || 600}
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <SkeletonSlider />
        )}
      </Swiper>

      <div style={sliderLoad ? { display: "block" } : { display: "none" }}>
        <div ref={prevRef} className={style.arrow_prev}>
          <IconArrowLeft className={style.arrow_prev_icon} />
        </div>
        <div ref={nextRef} className={style.arrow_next}>
          <IconArrowRight className={style.arrow_next_icon} />
        </div>
      </div>
    </div>
  );
};
