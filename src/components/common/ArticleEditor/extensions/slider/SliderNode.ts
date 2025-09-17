import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { SliderView } from "./SliderView";

const SliderNode = Node.create({
    name: "slider",
    group: "block",
    content: "image+",
    addAttributes() {
        return {
            id: {
                default: null, // уникальный id для каждого нового слайдера
            },
        };
    },
    parseHTML() {
        return [{ tag: "slider" }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["slider", mergeAttributes(HTMLAttributes), 0];
    },
    addNodeView() {
        return ReactNodeViewRenderer(SliderView);
    },
});
export default SliderNode;
