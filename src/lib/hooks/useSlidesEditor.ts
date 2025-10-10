// hooks/useSliderData.ts
import { useEffect, useState } from "react";
import { IMediaFrontWithFile } from "@/lib/models";

interface UseSliderDataProps {
    node?: any;
    mediaCollection?: IMediaFrontWithFile[];
    editor?: any;
}

export const useSliderData = ({ node, mediaCollection, editor }: UseSliderDataProps) => {
    const [slides, setSlides] = useState<IMediaFrontWithFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        
        let slideData: IMediaFrontWithFile[] = [];

        if (editor && node) {
            // Логика для редактора
            const mediaStore = editor.storage.mediaStore.getMedia();
            if (mediaStore) {
                const slideMediaIds = node.content?.content?.map((slide: any) => slide.attrs.mediaId) || [];
                slideData = slideMediaIds
                    .map((mediaId: string) => mediaStore.find((item: any) => item.id === mediaId))
                    .filter(Boolean);
            }
        } else if (node && mediaCollection) {
            // Логика для просмотра
            const slideMediaIds = node.content?.map((slide: any) => slide.attrs?.mediaId) || [];
            slideData = slideMediaIds
                .map((mediaId: string) => mediaCollection.find(item => item.id === mediaId))
                .filter(Boolean);
        }

        setSlides(slideData);
        setIsLoading(false);
    }, [node, mediaCollection, editor]);

    return { slides, isLoading };
};