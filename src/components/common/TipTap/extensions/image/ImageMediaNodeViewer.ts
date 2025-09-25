import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageEditor from "./ImageEditor";
import { IMediaFrontWithFile } from "@/lib/models";
import { ImageMediaNode, ImageNodeAttributes } from "./ImageMediaNode";
interface RenderHTMLProps {
    node: {
        attrs: ImageNodeAttributes;
    };
    HTMLAttributes: Record<string, any>;
}
export const ImageMediaNodeViewer = (
    mediaCollection: IMediaFrontWithFile[]
) => {
    return ImageMediaNode.extend({
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
                        "data-type": "mediaImage",
                        "data-media-id": mediaId,
                        class: "media-image media-not-found",
                    },
                    [
                        "img",
                        {
                            src: "/images/placeholder.jpg",
                            alt: "Image not found",
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
                    "data-type": "mediaImage",
                    "data-media-id": mediaId,
                    class: "media-image",
                },
                [
                    "img",
                    {
                        src: mediaItem.src,
                        alt: mediaItem.alt || HTMLAttributes.caption || "Image",
                        title: mediaItem.title,
                        width: mediaItem.width,
                        height: mediaItem.height,
                        loading: "lazy",
                        // ✅ Добавляем размеры для предотвращения layout shift
                        style: `aspect-ratio: ${mediaItem.width} / ${mediaItem.height};`,
                    },
                ],
                mediaItem.title ? ["figcaption", {}, mediaItem.title] : null,
            ].filter(Boolean);
        },
    });
};
