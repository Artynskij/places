import { NodeViewWrapper, useEditor } from "@tiptap/react";
import Image from "next/image";
import { IMediaFrontWithFile } from "@/lib/models";

export default function ImageEditor({ node, editor }: any) {
    const { mediaId } = node.attrs;

    // ищем картинку в editor.storage
    const media: IMediaFrontWithFile | undefined =
        editor?.storage.mediaStore.items.find(
            (m: IMediaFrontWithFile) => m.id === mediaId
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
        <NodeViewWrapper
            as="figure"
            className="media-image"
            data-type="mediaImage"
        >
            <Image
                src={media.src}
                alt={media.alt || ""}
                width={media.width || 800}
                height={media.height || 600}
            />
            {media.title && <figcaption>{media.title}</figcaption>}
        </NodeViewWrapper>
    );
}
