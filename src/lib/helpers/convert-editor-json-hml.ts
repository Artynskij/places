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
import { lowlight } from "@/components/common/TipTap/utils/lowright";
import { ImageMediaNodeViewer as ImageMediaNodeForViewer } from "@/components/common/TipTap/extensions/image/ImageMediaNodeViewer";
import { VideoMediaNodeViewer as VideoMediaNodeForViewer } from "@/components/common/TipTap/extensions/video/VideoMediaNodeViewer";
import { IMediaFront } from "../models";
import MediaStateExtension from "@/components/common/TipTap/extensions/state/mediaStateEditor";
import { SliderNodeForViewer } from "@/components/common/TipTap/extensions/slider/SliderNodeViewer";
import { TTipTapHTMLContent, TTipTapJSONContent } from "../models/types";

export const convertEditorJsonToHtml = (
    json: TTipTapJSONContent,
    mediaCollection: IMediaFront[]
): TTipTapHTMLContent => {
    const ImageNodeViewer = ImageMediaNodeForViewer(mediaCollection);
    const VideoNodeViewer = VideoMediaNodeForViewer(mediaCollection);
    const SliderNodeViewer = SliderNodeForViewer(mediaCollection);
    const extensions = [
        StarterKit.configure({
            blockquote: false,
            horizontalRule: false,
            link: false,
            underline: false,
            codeBlock: false,
        }),
        Underline,
        Link,
        ImageNodeViewer,
        Image,
        VideoNodeViewer,
        Blockquote,
        HorizontalRule,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Youtube.configure({
            controls: true,
            modestBranding: true,
            HTMLAttributes: { class: "youtube-video" },
        }),
        CodeBlockLowlight.configure({ lowlight }),
        SliderNodeViewer,
        MediaStateExtension,
    ];
    const html = generateHTML(json, extensions);

    return html;
};
