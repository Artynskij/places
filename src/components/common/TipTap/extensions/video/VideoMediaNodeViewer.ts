import { IMediaFrontWithFile } from "@/lib/models";
import { VideoMediaNode } from "./VideoMediaNode";
import { ImageNodeAttributes } from "../image/ImageMediaNode";
interface RenderHTMLProps {
    node: {
        attrs: ImageNodeAttributes;
    };
    HTMLAttributes: Record<string, any>;
}
export const VideoMediaNodeViewer = (
    mediaCollection: IMediaFrontWithFile[]
) => {
    return VideoMediaNode.extend({
        renderHTML({ node, HTMLAttributes }: RenderHTMLProps) {
            const mediaId = node.attrs.mediaId;
            const mediaItem = mediaCollection.find(
                (item) => item.id === mediaId
            );

            if (!mediaItem) {
                // Fallback для случая, если медиа не найдено
                return [
                    "figure",
                    {
                        "data-type": "mediaVideo",
                        "data-media-id": mediaId,
                        class: "media-video media-not-found",
                    },
                    [
                        "video",
                        {
                            src: "/images/placeholder.jpg",
                            alt: "mediaVideo not found",
                            width: 800,
                            height: 600,
                        },
                    ],
                    HTMLAttributes.caption
                        ? ["figcaption", {}, HTMLAttributes.caption]
                        : null,
                ].filter(Boolean);
            }

            // ✅ SEO-дружественный HTML с реальными данными
            return [
                "figure",
                {
                    "data-type": "mediaVideo",
                    "data-media-id": mediaId,
                    class: "media-video",
                },
                [
                    "video",
                    {
                        src: mediaItem.src,
                        alt: mediaItem.alt || HTMLAttributes.caption || "Image",
                        title: mediaItem.title,
                        width: mediaItem.width,
                        height: mediaItem.height,
                        loading: "lazy",
                        controls: true,
                        // ✅ Добавляем размеры для предотвращения layout shift
                        // style: `aspect-ratio: ${mediaItem.width} / ${mediaItem.height};`,
                    },
                ],
                mediaItem.title ? ["figcaption", {}, mediaItem.title] : null,
            ].filter(Boolean);
        },
    });
};
