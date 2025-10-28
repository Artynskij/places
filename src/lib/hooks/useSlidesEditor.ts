// hooks/useSliderData.ts
import { useEffect, useState } from "react";
import { IMediaFrontWithFile } from "@/lib/models";

interface UseSliderDataProps {
    node?: any;
    mediaCollection?: IMediaFrontWithFile[];
    editor?: any;
}

export const useSliderData = ({
    node,
    mediaCollection,
    editor,
}: UseSliderDataProps) => {
    const [slides, setSlides] = useState<IMediaFrontWithFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        let slideData: IMediaFrontWithFile[] = [];

        if (editor && node) {
            const mediaStore = editor.storage.mediaStore.items;

            const slidesData = node.attrs?.slides || [];
            if (mediaStore && slidesData.length > 0) {
                slideData = slidesData
                    .map((slide: { mediaId: string }) => {
                        const media = mediaStore.find(
                            (item: IMediaFrontWithFile) =>
                                item.id === slide.mediaId
                        );
                        return media || null;
                    })
                    .filter(Boolean);
            }
        } else if (node && mediaCollection) {
            // Логика для просмотра (если нужно)
            const slidesData = node.attrs?.slides || [];
            slideData = slidesData
                .map((slide: { mediaId: string }) =>
                    mediaCollection.find((item) => item.id === slide.mediaId)
                )
                .filter(Boolean);
        }

        setSlides(slideData);
        setIsLoading(false);
    }, [node, mediaCollection, editor]);

    return { slides, isLoading };
};
