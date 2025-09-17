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

import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import type { NodeViewProps } from "@tiptap/react";
import clsx from "clsx";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";


interface IProp extends NodeViewProps {}
export const SliderView = ({ node }: IProp) => {
    const [sliderLoad, setSliderLoad] = useState<boolean>(false);

    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);
    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;

        // привязка навигации через refs
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

    const images: string[] = node.content.content.map(
        (item: any) => item.attrs
    );
    useEffect(() => {
        // на случай если refs появились после onSwiper
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
        <NodeViewWrapper className={style.slider_ctn}>
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
                                <div
                                    className={clsx(
                                        style.slide_ctn,
                                        style.sliderImage
                                    )}
                                >
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

            <div
                style={sliderLoad ? { display: "block" } : { display: "none" }}
            >
                <div ref={prevRef} className={style.arrow_prev}>
                    <IconArrowLeft className={style.arrow_prev_icon} />
                </div>
                <div ref={nextRef} className={style.arrow_next}>
                    <IconArrowRight className={style.arrow_next_icon} />
                </div>
            </div>
        </NodeViewWrapper>
    );
};
