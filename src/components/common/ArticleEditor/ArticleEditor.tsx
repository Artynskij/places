"use client";
import "./articleEditor.scss";
import { useEditor, EditorContent } from "@tiptap/react";
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
import { lowlight } from "./utils/lowright";

import { Button, Space, Divider, Tooltip, message } from "antd";
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
import { SpinnerAnt } from "../Spinner/SpinnerAnt";

import ImageModalEditor from "./toolbar/ImageModalEditor";
import TableEditor from "./toolbar/TableEditor";
import YouTubeEditor from "./toolbar/YoutubeEditor";

import SliderNode from "./extensions/slider/SliderNode";
import { ImageMediaNode } from "./extensions/image/ImageMediaNode";
import { VideoMediaNode } from "./extensions/video/VideoMediaNode";
import VideoModalEditor from "./toolbar/VideoModalEditor";
import { hasFormatting } from "./utils/hasFormatting";

//
// кастомный Node для слайдера
//

export default function ArticleEditor() {
   
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            ImageMediaNode,
            Image,
            VideoMediaNode,
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
                width: 640,
                height: 360,
                HTMLAttributes: { class: "youtube-video" },
            }),
            CodeBlockLowlight.configure({ lowlight }),
            SliderNode,
        ],
        content: "<p>Добро пожаловать в редактор статей 🚀</p>",
        immediatelyRender: false,
    });

    // --- сохранение
    const handleSave = () => {
        if (!editor) return;
        console.log("Article JSON:", editor.getJSON());
        message.success("Статья сохранена (см. консоль)");
    };

    if (!editor) return <SpinnerAnt />;
    const formattingExists = hasFormatting(editor.getJSON());
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
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        • Список
                    </Button>
                    <Button
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        1. Список
                    </Button>
                    <Button
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        ❝ Цитата
                    </Button>
                    <Tooltip title="Вставка кода">
                        <Button
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
                <Tooltip title="Ссылка">
                    <Button
                        icon={<LinkOutlined />}
                        // onClick={() => setIsLinkModalOpen(true)}
                    />
                </Tooltip>
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

            <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={handleSave}
            >
                Сохранить
            </Button>

            {/* --- МОДАЛКИ --- */}

           
        </div>
    );
}
