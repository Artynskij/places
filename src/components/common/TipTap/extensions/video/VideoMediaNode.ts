import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoEditor from "./VideoEditor";
import { IMediaFront } from "@/lib/models";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaVideo: {
            setMediaVideo: (options: { mediaId: string }) => ReturnType;
        };
    }
}

export const VideoMediaNode = Node.create({
    name: "mediaVideo",
    group: "block",
    draggable: true,

    addAttributes() {
        return {
            mediaId: {
                default: null,
                // ✅ Важно: правильно парсить и рендерить HTML
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
                tag: "figure[data-type='mediaVideo']",
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
                "data-type": "mediaVideo",
                "data-media-id": HTMLAttributes.mediaId,
                class: "media-video",
            }),
            ["video"],
            ["figcaption", {}, ""],
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
                        attrs: {
                            mediaId: options.mediaId, // ✅ Только mediaId
                        },
                    });
                },
        };
    },
});
