"use client";

import style from "./sliderView.module.scss";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IconArrowRight } from "@/components/common/Icons/IconArrowRight/ArrowRightIcon";
import { IconArrowLeft } from "@/components/common/Icons/IconArrowLeft/ArrowLeftIcon";

import Image from "next/image";
import clsx from "clsx";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";
import { IMediaFrontWithFile } from "@/lib/models";

interface Props {
    slides: IMediaFrontWithFile[];
    showSkeleton?: boolean;
    isLoading?: boolean;
}

export const SliderBase = ({
    slides,
    showSkeleton = true,
    isLoading = false,
}: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // После монтирования даём 1 тик, чтобы DOM-refs гарантированно обновились
        const t = setTimeout(() => setReady(true), 0);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const swiper = swiperRef.current;
        if (!ready || !swiper) return;
        if (!prevRef.current || !nextRef.current || !paginationRef.current)
            return;

        swiper.params.navigation = swiper.params.navigation || {};
        swiper.params.pagination = swiper.params.pagination || {};

        try {
            swiper.navigation?.destroy?.();
            swiper.pagination?.destroy?.();
        } catch (err) {
            console.warn("⚠️ Swiper destroy warning:", err);
        }
        // @ts-ignore
        swiper.params.navigation.prevEl = prevRef.current;
        // @ts-ignore
        swiper.params.navigation.nextEl = nextRef.current;
        // @ts-ignore

        swiper.params.pagination.el = paginationRef.current;
        // @ts-ignore
        swiper.params.pagination.clickable = true;
        // @ts-ignore
        swiper.params.pagination.renderBullet = (index, className) =>
            `<span class="${className} ${style.pagination_bullet}"></span>`;

        // ✅ важно: сначала init, потом render(), потом update()
        swiper.navigation.init();
        swiper.pagination.init();
        swiper.pagination.render(); // <— принудительно создаём пули
        swiper.navigation.update();
        swiper.pagination.update();

        // 🔁 если slides динамические — форсим обновление пагинации
        swiper.update();
    }, [ready, slides]);

    if (isLoading) {
        return (
            <div className={style.slider_ctn}>
                <SkeletonSlider />
            </div>
        );
    }

    if (!slides || slides.length === 0) {
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
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                navigation={false}
                pagination={false}
            >
                {slides.map((media, i) => (
                    <SwiperSlide key={media.id || i}>
                        <div
                            className={clsx(style.slide_ctn, style.sliderImage)}
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
                ))}
            </Swiper>

            <div ref={prevRef} className={style.arrow_prev}>
                <IconArrowLeft className={style.arrow_prev_icon} />
            </div>
            <div ref={nextRef} className={style.arrow_next}>
                <IconArrowRight className={style.arrow_next_icon} />
            </div>
            <div ref={paginationRef} className={style.pagination}></div>
        </div>
    );
};
