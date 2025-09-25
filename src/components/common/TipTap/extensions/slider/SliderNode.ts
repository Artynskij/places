import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { SliderEditor } from "./SliderEditor";
import { nanoid } from "nanoid";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    slider: {
      insertSlider: (attributes: { mediaIds: string[]; id?: string }) => ReturnType;
    };
  }
}

const SliderNode = Node.create({
  name: "slider",
  group: "block",
  content: "mediaImage+",
  draggable: false,

  addAttributes() {
    return {
      id: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='slider']" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "slider",
        "data-node": JSON.stringify({
          id: node.attrs.id,
          content: node.content?.toJSON() || []
        }),
        class: "slider",
      })
    ];
  },

  addCommands() {
    return {
      insertSlider:
        ({ mediaIds, id }: { mediaIds: string[]; id?: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { id: id || nanoid() },
            content: mediaIds.map((mediaId) => ({
              type: "mediaImage",
              attrs: { mediaId },
            })),
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SliderEditor);
  },
});

export default SliderNode;