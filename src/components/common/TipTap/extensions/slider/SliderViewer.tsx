// components/SliderViewer.tsx
"use client";

import { SliderBase } from "./SliderBase";
import { IMediaFrontWithFile } from "@/lib/models";

interface Props {
    node: any;
    mediaCollection: IMediaFrontWithFile[];
}

export const SliderViewer = ({ node, mediaCollection }: Props) => {
    // Вычисляем слайды напрямую, без хука
    const slideMediaIds =
        node?.content?.map((slide: any) => slide.attrs?.mediaId) || [];
    console.log("SliderViewer slideMediaIds", slideMediaIds);
    console.log("SliderViewer mediaCollection", mediaCollection);
    const slides = slideMediaIds
        .map((mediaId: string) =>
            mediaCollection.find((item) => item.id === mediaId)
        )
        .filter(Boolean);

    return <SliderBase slides={slides} showSkeleton={false} />;
};
