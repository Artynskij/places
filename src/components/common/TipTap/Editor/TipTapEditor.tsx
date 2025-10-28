"use client";
import "./editor.scss";
import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "../utils/lowright";

import { Button, Space, Divider, Tooltip, message, Modal } from "antd";
import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    StrikethroughOutlined,
    LinkOutlined,
    PictureOutlined,
    YoutubeOutlined,
    TableOutlined,
    CodeOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { SpinnerAnt } from "../../Spinner/SpinnerAnt";

import ImageModalEditor from "../toolbar/ImageModalEditor";
import TableEditor from "../toolbar/TableEditor";
import YouTubeEditor from "../toolbar/YoutubeEditor";

import SliderNode from "../extensions/slider/SliderNode";
import { ImageMediaNode } from "../extensions/image/ImageMediaNode";
import { VideoMediaNode } from "../extensions/video/VideoMediaNode";
import VideoModalEditor from "../toolbar/VideoModalEditor";
import { useEffect, useState } from "react";
import { LinkModalEditor } from "../toolbar/LinkModalEditor";
import MediaStateExtension from "../extensions/state/mediaStateEditor";
import { IMediaFrontWithFile } from "@/lib/models";
import { getHtmlFormJsonEditor } from "@/lib/helpers/get-html-form-json-editor";
import { TTipTapHTMLContent, TTipTapJSONContent } from "@/lib/models/types";
interface IProp {
    setEditorData: (data: {
        content: any;
        mediaStorage: IMediaFrontWithFile[];
    }) => void;
    onEditorInit?: (editor: any) => void; // ✅ Новый пропс
    initialContent?: TTipTapHTMLContent | TTipTapJSONContent;
    initialMediaStorage?: IMediaFrontWithFile[];
}

export default function TipTapEditor({
    setEditorData,
    onEditorInit,
    initialContent,
    initialMediaStorage,
}: IProp) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: false,
                horizontalRule: false,
                link: false,
                underline: false,
                codeBlock: false,
                heading: false,
            }),
            Underline,
            Link.configure({ openOnClick: false }),
            Blockquote,
            HorizontalRule,
            Heading.configure({ levels: [1, 2, 3] }),
            Placeholder.configure({ placeholder: "Начните писать статью..." }),
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            Youtube.configure({
                controls: true,
                modestBranding: true,
                HTMLAttributes: { class: "youtube-video" },
            }),
            CodeBlockLowlight.configure({ lowlight }),
            Image,
            ImageMediaNode,
            VideoMediaNode,
            SliderNode,
            MediaStateExtension,
        ],
        content: initialContent,

        immediatelyRender: false,
        onCreate: ({ editor }) => {
            if (initialContent || initialMediaStorage) {
                const mediaStorage = editor.storage.mediaStore.items;
                const contentJson = editor.getJSON();

                setEditorData({
                    content: contentJson,
                    mediaStorage: mediaStorage,
                });
            }
        },
        onUpdate: ({ editor }) => {
            const mediaStorage = editor.storage.mediaStore.items;
            const contentJson = editor.getJSON();

            setEditorData({
                content: contentJson,
                mediaStorage: mediaStorage,
            });
        },
    });
    const [, setRender] = useState(0);

    useEffect(() => {
        if (!editor) return;
        // ✅ Восстанавливаем медиа storage при загрузке
        if (initialMediaStorage && initialMediaStorage.length > 0) {
            editor.commands.setMediaStorage(initialMediaStorage);
        }

        if (onEditorInit) {
            onEditorInit(editor);
        }
        const update = () => setRender((x) => x + 1);

        editor.on("selectionUpdate", update);
        editor.on("transaction", update);

        return () => {
            editor.off("selectionUpdate", update);
            editor.off("transaction", update);
        };
    }, [editor, onEditorInit]);

    if (!editor) return <SpinnerAnt />;

    return (
        <div className="article-editor">
            {/* панель закреплена */}
            <Space wrap className="editor-toolbar">
                {/* базовые стили */}
                <>
                    <Tooltip title="Жирный">
                        <Button
                            icon={<BoldOutlined />}
                            type={
                                editor.isActive("bold") ? "primary" : "default"
                            }
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Курсив">
                        <Button
                            icon={<ItalicOutlined />}
                            type={
                                editor.isActive("italic")
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Подчёркнутый">
                        <Button
                            icon={<UnderlineOutlined />}
                            type={
                                editor.isActive("underline")
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Зачёркнутый">
                        <Button
                            icon={<StrikethroughOutlined />}
                            type={
                                editor.isActive("strike")
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                        />
                    </Tooltip>
                </>
                <Divider type="vertical" />

                {/* заголовки */}
                <>
                    <Button
                        type={
                            editor.isActive("heading", { level: 1 })
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }
                    >
                        H1
                    </Button>
                    <Button
                        type={
                            editor.isActive("heading", { level: 2 })
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                    >
                        H2
                    </Button>
                    <Button
                        type={
                            editor.isActive("heading", { level: 3 })
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }
                    >
                        H3
                    </Button>
                </>
                <Divider type="vertical" />

                {/* списки */}
                <>
                    <Button
                        type={
                            editor.isActive("bulletList")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        • Список
                    </Button>
                    <Button
                        type={
                            editor.isActive("orderedList")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        1. Список
                    </Button>
                    <Button
                        type={
                            editor.isActive("blockquote")
                                ? "primary"
                                : "default"
                        }
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        ❝ Цитата
                    </Button>
                    <Tooltip title="Вставка кода">
                        <Button
                            type={
                                editor.isActive("codeBlock")
                                    ? "primary"
                                    : "default"
                            }
                            icon={<CodeOutlined />}
                            onClick={() =>
                                editor.chain().focus().toggleCodeBlock().run()
                            }
                        />
                    </Tooltip>
                    <TableEditor editor={editor}>
                        <Tooltip title="Таблица">
                            <Button icon={<TableOutlined />}>Таблица</Button>
                        </Tooltip>
                    </TableEditor>
                </>
                <Divider type="vertical" />

                {/* медиа */}
                <LinkModalEditor editor={editor}>
                    <Tooltip title="Ссылка">
                        <Button
                            type={
                                editor.isActive("link") ? "primary" : "default"
                            }
                            icon={<LinkOutlined />}
                        />
                    </Tooltip>
                </LinkModalEditor>
                <ImageModalEditor type="media" editor={editor}>
                    <Tooltip title="Картинка">
                        <Button icon={<PictureOutlined />} />
                    </Tooltip>
                </ImageModalEditor>

                <VideoModalEditor editor={editor}>
                    <Tooltip title="Видео">
                        <Button icon={<VideoCameraOutlined />} />
                    </Tooltip>
                </VideoModalEditor>

                <ImageModalEditor type="slider" editor={editor}>
                    <Tooltip title="Слайдер">
                        <Button>Слайдер</Button>
                    </Tooltip>
                </ImageModalEditor>

                <Divider type="vertical" />
                <YouTubeEditor editor={editor}>
                    <Tooltip title="YouTube">
                        <Button icon={<YoutubeOutlined />} />
                    </Tooltip>
                </YouTubeEditor>
                <Divider type="vertical" />

                <Button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Разделитель
                </Button>
                {/* {formattingExists && ( */}
                <Button
                    danger
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .unsetAllMarks()
                            .clearNodes()
                            .run()
                    }
                >
                    Очистить
                </Button>
                {/* )} */}
            </Space>

            {/* редактор */}
            <EditorContent editor={editor} className="editor" />
            {/* 
            <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={handleSave}
            >
                Сохранить
            </Button> */}
        </div>
    );
}
