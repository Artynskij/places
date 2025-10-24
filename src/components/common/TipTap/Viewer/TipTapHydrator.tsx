"use client";
import style from "./tiptapViewer.module.scss";
import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
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
    const rootsRef = useRef<Map<Element, Root>>(new Map());

    useEffect(() => {
        if (!containerRef.current) return;

        // Обрабатываем слайдеры
        const sliders = containerRef.current.querySelectorAll(
            '[data-type="slider"]'
        );
        console.log("sliders", sliders);
        sliders.forEach((el) => {
            const json = el.getAttribute("data-node");

            if (!json) return;

            // Парсим содержимое слайдера
            const nodeData = JSON.parse(json);
            console.log("nodeData", nodeData);
            // Очищаем содержимое
            el.innerHTML = "";

            // Используем существующий root или создаем новый
            let root = rootsRef.current.get(el);
            if (!root) {
                root = createRoot(el);
                rootsRef.current.set(el, root);
            }

            root.render(
                <SliderViewer
                    node={nodeData}
                    mediaCollection={mediaCollection}
                />
            );
        });

        // Очистка: отмонтируем корни для удаленных элементов
        return () => {
            rootsRef.current.forEach((root, element) => {
                if (!containerRef.current?.contains(element)) {
                    root.unmount();
                    rootsRef.current.delete(element);
                }
            });
        };
    }, [html, reHydrate, mediaCollection]);

    return (
        <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: html }}
            className={clsx(style.articleViewer, "prose-base")}
        />
    );
}
