"use client";
import { ArticlePreview } from "@/components/common/Article/ArticlePreview/ArticlePreview";
import { TipTapViewer } from "@/components/common/TipTap/Viewer/TipTapViewer";
import { IArticleNewFront } from "@/lib/models";
import { Editor } from "@tiptap/react";
import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

interface IProp {
    children?: React.ReactNode | React.ReactNode[];
    article: IArticleNewFront | null;
    handlePreview: () => Promise<boolean>; // исправлено
}
export default function PreviewEditor({
    children,
    article,
    handlePreview,
}: IProp) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [reHydrate, setReHydrate] = useState(0);
    const handlerOpenModal = async () => {
        const saved = await handlePreview();
        if (!saved) {
            return;
        }

        setIsPreviewOpen(true);
        setReHydrate(reHydrate + 1);
        message.success("Preview статьи");
    };

    return (
        <>
            <div style={{ display: "inline-block" }} onClick={handlerOpenModal}>
                {children}
            </div>

            <Modal
                title="Предпросмотр статьи"
                open={isPreviewOpen}
                onCancel={() => setIsPreviewOpen(false)}
                footer={null}
                width={1800}
            >
                {article && (
                    <ArticlePreview reHydrate={reHydrate} article={article} />
                )}
            </Modal>
        </>
    );
}
