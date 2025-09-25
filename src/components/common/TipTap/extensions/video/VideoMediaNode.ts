import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoEditor from "./VideoEditor";
import { IMediaFront } from "@/lib/models";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaVideo: {
            /**
             * Вставить кастомное видео с подписью
             */
            setMediaVideo: (options: {
                mediaId: string;
                src: string;
                // title?: string;
                // caption?: string;
                // width?: number | string;
                // height?: number | string;
                // controls?: boolean;
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
            mediaId: { default: null },
            src: { default: null },
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
                class: "media-video",
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
        return ReactNodeViewRenderer(VideoEditor);
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
