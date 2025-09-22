"use client";
import style from "./tiptapViewer.module.scss";
import { useEffect, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { SliderViewer } from "../extensions/slider/SliderViewer";
import clsx from "clsx";

export default function TipTapHydrator({
    html,
    reHydrate,
}: {
    html: string;
    reHydrate: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(reHydrate);
        if (!containerRef.current) return;

        const sliders = containerRef.current.querySelectorAll(".slider");

        sliders.forEach((el) => {
            const json = (el as HTMLElement).getAttribute("data-node");
            if (!json) return;

            el.innerHTML = ""; // очищаем

            const root = createRoot(el as HTMLElement);
            root.render(<SliderViewer node={JSON.parse(json)} />);
        });
    }, [html, reHydrate]); // важно зависеть от html

    return (
        <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: html }}
            className={clsx(style.articleViewer, "prose-base")}
        />
    );
}
