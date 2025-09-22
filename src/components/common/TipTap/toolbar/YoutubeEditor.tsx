"use client";
import { Editor } from "@tiptap/react";
import { Input, message, Modal } from "antd";
import { useState } from "react";

interface IProp {
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}
export default function YouTubeEditor({ editor, children }: IProp) {
    const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const normalizeYoutubeUrl = (url: string) => {
        if (!url) return null;
        return url
            .replace("watch?v=", "embed/")
            .replace("youtu.be/", "www.youtube.com/embed/");
    };
    const handleInsertYoutube = () => {
        if (!editor) return;

        const embed = normalizeYoutubeUrl(inputValue);
        if (!embed) {
            message.error(`Некорректная ссылка: ${inputValue}`);
            return;
        }
        editor.chain().focus().setYoutubeVideo({ src: embed }).run();
        setIsYoutubeModalOpen(false);
        setInputValue("");
    };
    const handlerOpenModal = () => {
        setIsYoutubeModalOpen(true);
    };
    return (
        <>
            <div onClick={handlerOpenModal}>{children}</div>
            <Modal
                title="Вставить YouTube"
                open={isYoutubeModalOpen}
                onOk={handleInsertYoutube}
                onCancel={() => setIsYoutubeModalOpen(false)}
            >
                <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Modal>
        </>
    );
}
