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

import { ImageMediaNode } from "../extensions/image/ImageMediaNode";
import { VideoMediaNode } from "../extensions/video/VideoMediaNode";
import SliderNode from "../extensions/slider/SliderNode";
import { lowlight } from "../utils/lowright";
import TipTapHydrator from "./TipTapHydrator";

interface Props {
    json: any;
    reHydrate: number;
}

export const TipTapViewer = ({ json, reHydrate }: Props) => {
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
        ImageMediaNode,
        Image,
        VideoMediaNode,
        Blockquote,
        HorizontalRule,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Youtube,
        CodeBlockLowlight.configure({ lowlight }),
        SliderNode,
    ]);

    return (
        // <div className={style.articleViewer}>
        <TipTapHydrator  reHydrate={reHydrate} html={html} />
        // </div>
    );
};
