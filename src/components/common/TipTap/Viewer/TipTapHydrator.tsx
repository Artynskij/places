"use client";
import style from "./tiptapViewer.module.scss";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliderViewer } from "../extensions/slider/SliderViewer";
import clsx from "clsx";
import { IMediaFront } from "@/lib/models";

interface Props {
    html: string;
    reHydrate: number;
    mediaCollection: IMediaFront[];
}

export default function TipTapHydrator({
    html,
    reHydrate,
    mediaCollection,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Обрабатываем слайдеры
        const sliders = containerRef.current.querySelectorAll(
            '[data-type="slider"]'
        );

        sliders.forEach((el) => {
            const json = el.getAttribute("data-node");
            if (!json) return;

            // Парсим содержимое слайдера - ВСЕ ДАННЫЕ УЖЕ ЗДЕСЬ!
            const nodeData = JSON.parse(json);
            // console.log("Slider node data:", nodeData);

            el.innerHTML = "";
            const root = createRoot(el);
            root.render(
                <SliderViewer
                    node={nodeData}
                    mediaCollection={mediaCollection}
                />
            );
        });
    }, [html, reHydrate, mediaCollection]);

    return (
        <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: html }}
            className={clsx(style.articleViewer, "prose-base")}
        />
    );
}