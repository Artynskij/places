// view/videoView.tsx
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { IMediaFront } from "@/lib/models";

const VideoEditor: React.FC<any> = ({ node, editor }) => {
    // const { src, caption, width, height, controls } = node.attrs;
    const { mediaId } = node.attrs;
    const media: IMediaFront | undefined =
        editor?.storage.mediaStore.items.find(
            (m: IMediaFront) => m.id === mediaId
        );
    if (!media) {
        return (
            <NodeViewWrapper
                as="figure"
                className="media-image"
                data-type="mediaImage"
            >
                <div style={{ color: "red" }}>
                    Медиа не найдено (id: {mediaId})
                </div>
            </NodeViewWrapper>
        );
    }
    return (
        <NodeViewWrapper as="figure" className="media-video">
            <video
                src={media.src}
                width={media.width}
                height={media.height}
                controls={true}
                style={{ maxWidth: "100%" }}
            />
            {media.title && <figcaption>{media.title}</figcaption>}
            <NodeViewContent />
        </NodeViewWrapper>
    );
};

export default VideoEditor;
