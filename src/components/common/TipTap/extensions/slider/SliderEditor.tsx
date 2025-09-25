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

import { NodeViewWrapper, useEditor } from "@tiptap/react";
import Image from "next/image";
import type { NodeViewProps } from "@tiptap/react";
import clsx from "clsx";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";
import { IMediaFrontWithFile } from "@/lib/models";

interface IProp extends Partial<NodeViewProps> {
    node?: any;
}

export const SliderEditor = ({ node, editor }: IProp) => {
    // const editor = useEditor();
    const [sliderLoad, setSliderLoad] = useState(false);
    const [slides, setSlides] = useState<IMediaFrontWithFile[]>([]);

    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    // Получаем данные слайдов из storage редактора
    useEffect(() => {
        if (!editor || !node) return;

        const mediaStore = editor.storage.mediaStore.getMedia();
        if (!mediaStore) return;

        // Извлекаем mediaId из контента слайдера
        const slideMediaIds =
            node.content?.content?.map((slide: any) => slide.attrs.mediaId) ||
            [];

        // Находим соответствующие медиа в storage
        const slideData = slideMediaIds
            .map((mediaId: string) => {
                const mediaItem = mediaStore.find(
                    (item: any) => item.id === mediaId
                );
                return mediaItem;
            })
            .filter(Boolean);

        setSlides(slideData);
    }, [editor, node]);

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

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            // @ts-ignore
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [slides]); // Обновляем навигацию при изменении слайдов

    return (
        <NodeViewWrapper as="div" className={style.slider_ctn}>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                onSwiper={handleSwiper}
            >
                {sliderLoad && slides.length > 0 ? (
                    slides.map((media: IMediaFrontWithFile, i: number) => (
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
        </NodeViewWrapper>
    );
};
