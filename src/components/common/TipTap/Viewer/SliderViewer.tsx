"use client";

import { SliderBase } from "../extensions/slider/SliderBase";
import { IMediaFrontWithFile } from "@/lib/models";

interface Props {
    node: any;
    mediaCollection: IMediaFrontWithFile[];
}

export const SliderViewer = ({ node, mediaCollection }: Props) => {
    const slidesData = node.attrs.slides || [];

    const slides = slidesData
        .map((slide: { mediaId: string }) =>
            mediaCollection.find((item) => item.id === slide.mediaId)
        )
        .filter(Boolean);

    return <SliderBase slides={slides} showSkeleton={false} />;
};
