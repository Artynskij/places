import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { SliderEditor } from "./SliderEditor";

const SliderNode = Node.create({
    name: "slider",
    group: "block",
    content: "image+",
    draggable: false,

    addAttributes() {
        return {
            id: { default: null }, // уникальный id
        };
    },

    parseHTML() {
        return [{ tag: "slider" }];
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            "div",
            {
                ...mergeAttributes(HTMLAttributes),
                "data-node": JSON.stringify(node), // 👈 сериализация
                class: "slider",
            },
            0,
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(SliderEditor); // редакторский React-view
    },
});

export default SliderNode;
