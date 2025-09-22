import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";

export default function ImageNodeView({ node }: any) {
    const { src, alt, caption, width, height } = node.attrs;

    return (
        <NodeViewWrapper
            as="figure"
            class="media-image"
            data-type="mediaImage"
        >
            <Image src={src} alt={alt || ""} width={width} height={height} />
            {caption && <figcaption>{caption}</figcaption>}
        </NodeViewWrapper>
    );
}
