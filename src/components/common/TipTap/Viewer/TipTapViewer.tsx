"use client";

import parse from "html-react-parser";
import clsx from "clsx";
import style from "./tiptapViewer.module.scss";
import { SliderViewer } from "./SliderViewer";
import { IMediaFront } from "@/lib/models";

interface Props {
    contentEditor: string; // HTML из базы
    mediaCollection: IMediaFront[];
}

export const TipTapViewer = ({ contentEditor, mediaCollection }: Props) => {
    const content = parse(contentEditor, {
        replace: (node: any) => {
            if (node.attribs?.["data-type"] === "slider") {
                try {
                    const slides = JSON.parse(
                        node.attribs["data-slides"] || "[]"
                    );

                    return (
                        <SliderViewer
                            node={{ attrs: { slides } }}
                            mediaCollection={mediaCollection}
                        />
                    );
                } catch (err) {
                    console.error("❌ Error parsing slider:", err);
                    return null;
                }
            }

            // можно добавить другие ноды:
            // if (node.attribs?.["data-type"] === "video") return <VideoViewer ... />

            return undefined; // вернуть оригинальную ноду, если это не наш тип
        },
    });

    return (
        <div className={clsx(style.articleViewer, "prose-base")}>{content}</div>
    );
};
