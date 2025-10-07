"use client";

import style from "./sliderView.module.scss";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Controller } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";

import Image from "next/image";
import clsx from "clsx";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";
import { IMediaFrontWithFile } from "@/lib/models";

interface Props {
    node: any; // json из data-node
    mediaCollection: IMediaFrontWithFile[]; // коллекция медиа для подстановки реальных данных
}

export const SliderViewer = ({ node, mediaCollection }: Props) => {
    const [sliderLoad, setSliderLoad] = useState(false);
    const [slides, setSlides] = useState<IMediaFrontWithFile[]>([]);

    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    // Преобразуем mediaId в реальные данные изображений
    useEffect(() => {
        if (!node || !mediaCollection) return;
        // Извлекаем mediaId из слайдов
        const slideMediaIds =
            node.content?.map((slide: any) => slide.attrs?.mediaId) || [];

        // Находим соответствующие медиа в коллекции
        const slideData = slideMediaIds
            .map((mediaId: string) => {
                const mediaItem = mediaCollection.find(
                    (item) => item.id === mediaId
                );
                return mediaItem;
            })
            .filter(Boolean);

        setSlides(slideData);
        setSliderLoad(true);
    }, [node, mediaCollection]);

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
    };

    useEffect(() => {
        if (
            swiperRef.current &&
            prevRef.current &&
            nextRef.current &&
            slides.length > 0
        ) {
            // @ts-ignore
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [slides]); // Обновляем при изменении слайдов

    // Fallback для случая, если медиа не найдены
    if (slides.length === 0) {
        return (
            <div className={style.slider_ctn}>
                <div className={style.error_message}>
                    Слайдер не может быть отображен. Медиафайлы не найдены.
                </div>
            </div>
        );
    }

    return (
        <div className={style.slider_ctn}>
            <Swiper
                modules={[Navigation, Controller]}
                slidesPerView={1}
                spaceBetween={10}
                onSwiper={handleSwiper}
            >
                {sliderLoad ? (
                    slides.map((media: any, i: number) => (
                        <SwiperSlide key={media.id || i}>
                            <div
                                className={clsx(
                                    style.slide_ctn,
                                    style.sliderImage
                                )}
                            >
                                <Image
                                    className={style.sliderImage_img}
                                    src={media.src}
                                    alt={media.alt || `slide-${i}`}
                                    width={media.width || 800}
                                    height={media.height || 600}
                                    priority={i === 0}
                                />
                                {media.title && (
                                    <figcaption>{media.title}</figcaption>
                                )}
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SkeletonSlider />
                )}
            </Swiper>

            {sliderLoad && slides.length > 0 && (
                <div>
                    <div ref={prevRef} className={style.arrow_prev}>
                        <IconArrowLeft className={style.arrow_prev_icon} />
                    </div>
                    <div ref={nextRef} className={style.arrow_next}>
                        <IconArrowRight className={style.arrow_next_icon} />
                    </div>
                </div>
            )}
        </div>
    );
};
