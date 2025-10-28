"use client";
import style from "./tiptapViewer.module.scss";
import { useLayoutEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { SliderViewer } from "./SliderViewer";
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

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        console.log("🔄 TipTapHydrator: Searching for sliders...");
        console.log("📦 Media collection:", mediaCollection);

        const sliders = containerRef.current.querySelectorAll(
            '[data-type="slider"]'
        );

        console.log(`🎠 Found ${sliders.length} sliders`);

        sliders.forEach((el, index) => {
            const slidesData = el.getAttribute("data-slides");
            console.log(`📋 Slider ${index + 1} data:`, slidesData);

            if (!slidesData) {
                console.warn("❌ No data-slides attribute found");
                return;
            }

            try {
                const slides = JSON.parse(slidesData);
                console.log(`🖼️ Slider ${index + 1} parsed slides:`, slides);

                el.replaceChildren();

                let root = rootsRef.current.get(el);
                if (!root) {
                    root = createRoot(el);
                    rootsRef.current.set(el, root);
                }

                root.render(
                    <SliderViewer
                        node={{ attrs: { slides } }}
                        mediaCollection={mediaCollection}
                    />
                );

                console.log(`✅ Slider ${index + 1} rendered successfully`);
            } catch (error) {
                console.error(`❌ Error parsing slider ${index + 1}:`, error);
            }
        });

        // Cleanup
        return () => {
            rootsRef.current.forEach((root, el) => {
                root.unmount();
            });
            rootsRef.current.clear();
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
