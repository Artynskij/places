// extensions/ImageWithCaption.ts
import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageEditor from "./ImageEditor";
import { IMediaFrontWithFile } from "@/lib/models";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaImage: {
            /**
             * Вставить кастомную картинку с подписью
             */
            setMediaImage: (options: {
                mediaId: string;
                src: string;
                alt: string;
            }) => ReturnType;
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
            mediaId: { default: null },
            src: { default: "" },
            alt: { default: "" },
        };
    },

    parseHTML() {
        return [{ tag: "figure[data-type='mediaImage']" }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "figure",
            mergeAttributes(HTMLAttributes, {
                "data-type": "mediaImage",
                class: "media-image",
            }),
            ["img", { src: HTMLAttributes.src, alt: HTMLAttributes.alt || "" }],
            ["figcaption", {}, HTMLAttributes.caption || ""],
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
