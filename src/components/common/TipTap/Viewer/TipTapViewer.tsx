import style from "./articleViewer.module.scss";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";


import SliderNode from "../extensions/slider/SliderNode";
import { lowlight } from "../utils/lowright";
import TipTapHydrator from "./TipTapHydrator";
import MediaStateExtension from "../extensions/state/mediaStateEditor";
import { IMediaFront } from "@/lib/models";
import { ImageMediaNodeViewer } from "../extensions/image/ImageMediaNodeViewer";
import { VideoMediaNodeViewer } from "../extensions/video/VideoMediaNodeViewer";

interface Props {
    json: any;
    reHydrate: number;
    mediaCollection: IMediaFront[];
}

export const TipTapViewer = ({ json, reHydrate, mediaCollection }: Props) => {
    const ImageNode = ImageMediaNodeViewer(mediaCollection);
    const VideoNode = VideoMediaNodeViewer(mediaCollection);

    const html = generateHTML(json, [
        StarterKit.configure({
            blockquote: false,
            horizontalRule: false,
            link: false,
            underline: false,
            codeBlock: false,
        }),
        Underline,
        Link,
        ImageNode,
        Image,
        VideoNode,
        Blockquote,
        HorizontalRule,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Youtube,
        CodeBlockLowlight.configure({ lowlight }),
        SliderNode,
        MediaStateExtension,
    ]);

    return (
        // <div className={style.articleViewer}>
        <TipTapHydrator
            mediaCollection={mediaCollection}
            reHydrate={reHydrate}
            html={html}
        />
        // </div>
    );
};
