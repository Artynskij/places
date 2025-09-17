// extensions/ImageWithCaption.ts
import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageNodeView from "./ImageView";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaImage: {
            /**
             * Вставить кастомную картинку с подписью
             */
            setMediaImage: (options: {
                src: string;
                alt?: string;
                title?: string;
                caption?: string;
                height?: number;
                width?: number;
            }) => ReturnType;
        };
    }
}

export const ImageMediaNode = Node.create({
    name: "mediaImage",
    group: "block",
    draggable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: null },
            title: { default: null },
            height: { default: null },
            width: { default: null },
            caption: { default: "" },
        };
    },

    parseHTML() {
        return [{ tag: "figure[data-type='mediaImage']" }];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageNodeView);
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
