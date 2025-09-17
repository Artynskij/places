// view/videoView.tsx
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const VideoNodeView: React.FC<any> = ({ node }) => {
    const { src, caption, width, height, controls } = node.attrs;

    return (
        <NodeViewWrapper as="figure" className="article-media">
            <video
                src={src}
                width={width}
                height={height}
                controls={controls}
                style={{ maxWidth: "100%" }}
            />
            {caption && <figcaption>{caption}</figcaption>}
            <NodeViewContent />
        </NodeViewWrapper>
    );
};

export default VideoNodeView;
