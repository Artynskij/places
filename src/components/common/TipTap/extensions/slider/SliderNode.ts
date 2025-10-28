import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { SliderEditor } from "./SliderEditor";
import { nanoid } from "nanoid";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        slider: {
            insertSlider: (attributes: {
                slides: Array<{ mediaId: string }>;
                id?: string;
            }) => ReturnType;
        };
    }
}

const SliderNode = Node.create({
    name: "slider",
    group: "block",
    draggable: true,

    addAttributes() {
        return {
            id: {
                default: () => nanoid(),
                parseHTML: (element) => element.getAttribute("data-slider-id"),
                renderHTML: (attributes) => ({
                    "data-slider-id": attributes.id,
                }),
            },
            slides: {
                default: [],
                parseHTML: (element) => {
                    const slidesData = element.getAttribute("data-slides");
                    return slidesData ? JSON.parse(slidesData) : [];
                },
                renderHTML: (attributes) => ({
                    "data-slides": JSON.stringify(attributes.slides || []), // ✅ Защита
                }),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "div[data-type='slider']",
                getAttrs: (dom) => ({
                    id: dom.getAttribute("data-slider-id"),
                    slides: JSON.parse(dom.getAttribute("data-slides") || "[]"), // ✅ Защита
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, {
                "data-type": "slider",
                "data-slider-id": HTMLAttributes.id,
                "data-slides": JSON.stringify(HTMLAttributes.slides || []), // ✅ Защита
                class: "slider-container",
            }),
        ];
    },

    addCommands() {
        return {
            insertSlider:
                ({
                    slides,
                    id,
                }: {
                    slides: Array<{ mediaId: string; caption?: string }>;
                    id?: string;
                }) =>
                ({ commands }) => {
                    // ✅ Защита от undefined
                    const safeSlides = slides || [];
                    const safeId = id || nanoid();

                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            id: safeId,
                            slides: safeSlides,
                        },
                    });
                },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(SliderEditor);
    },
});

export default SliderNode;
