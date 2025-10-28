// extensions/ImageWithCaption.ts
import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageEditor from "./ImageEditor";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaImage: {
            /**
             * Вставить кастомную картинку с подписью
             */
            setMediaImage: (options: { mediaId: string }) => ReturnType;
        };
    }
}
export interface ImageNodeAttributes {
    mediaId: string;
    src: string;
    alt: string;
}
export const ImageMediaNode = Node.create({
    name: "mediaImage",
    group: "block",
    draggable: true,

    addAttributes() {
        return {
            mediaId: {
                default: null,
                // ✅ Важно: сохранять только ID
                parseHTML: (element) => element.getAttribute("data-media-id"),
                renderHTML: (attributes) => {
                    return {
                        "data-media-id": attributes.mediaId,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "figure[data-type='mediaImage']",
                getAttrs: (dom) => {
                    return {
                        mediaId: dom.getAttribute("data-media-id"),
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "figure",
            mergeAttributes(HTMLAttributes, {
                "data-type": "mediaImage",
                "data-media-id": HTMLAttributes.mediaId, // ✅ Только ID
                class: "media-image",
            }),
            ["img"], // src и alt будут добавлены в NodeView
            ["figcaption", {}, ""], // caption тоже из mediaStorage
        ];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ImageEditor);
    },
    addCommands() {
        return {
            setMediaImage:
                (options) =>
                ({ commands }: CommandProps) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: options,
                    });
                },
        };
    },
});
