import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoNodeView from "./VideoView";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaVideo: {
            /**
             * Вставить кастомное видео с подписью
             */
            setMediaVideo: (options: {
                src: string;
                title?: string;
                caption?: string;
                width?: number | string;
                height?: number | string;
                controls?: boolean;
            }) => ReturnType;
        };
    }
}

export const VideoMediaNode = Node.create({
    name: "mediaVideo",
    group: "block",
    draggable: true,

    addAttributes() {
        return {
            src: { default: null },
            title: { default: null },
            caption: { default: "" },
            width: { default: "100%" },
            height: { default: 400 },
            controls: { default: true },
        };
    },

    parseHTML() {
        return [{ tag: "figure[data-type='mediaVideo']" }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "figure",
            mergeAttributes(HTMLAttributes, {
                "data-type": "mediaVideo",
                class: "article-video",
            }),
            [
                "video",
                {
                    src: HTMLAttributes.src,
                    title: HTMLAttributes.title || "",
                    width: HTMLAttributes.width,
                    height: HTMLAttributes.height,
                    controls: HTMLAttributes.controls,
                },
            ],
            ["figcaption", {}, HTMLAttributes.caption || ""],
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(VideoNodeView);
    },

    addCommands() {
        return {
            setMediaVideo:
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
