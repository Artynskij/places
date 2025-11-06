"use client";
import style from "./tiptapViewer.module.scss";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { useAlertMessage } from "@/lib/context";
import useLocale from "@/lib/hooks/useLocale";
import { IArticleFront, IPersonFront } from "@/lib/models";
import { Modal } from "antd";
import { useState } from "react";
import { CardArticleFull } from "../../Cards/(article)/ArticleFull/ArticleFull";

interface IProp {
    children?: React.ReactNode | React.ReactNode[];
    article: IArticleFront | null;
    handlePreview?: () => Promise<boolean>; // исправлено
}
export default function PreviewEditor({
    children,
    article,
    handlePreview,
}: IProp) {
    const message = useAlertMessage();
    const locale = useLocale();
    const personService = new PersonService();

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [reHydrate, setReHydrate] = useState(0);
    const [author, setAuthor] = useState<IPersonFront>();
    const handlerOpenModal = async () => {
        const saved = handlePreview ? await handlePreview() : true;
        if (!saved) {
            console.log("handlePreview good");
            return;
        }
        // if (!article) return;
        if (article?.author) {
            const personResponse = await personService.getById(
                article.author.id,
                locale
            );
            if (!personResponse) {
                return;
            }
            setAuthor(personResponse);
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
                    <div className="container">
                        <section className={style.preview}>
                            <div className={style.preview_content}>
                                <CardArticleFull
                                    author={author}
                                    // reHydrate={reHydrate}
                                    article={article}
                                />
                            </div>
                            <div className={style.popular}></div>
                        </section>
                    </div>
                )}
            </Modal>
        </>
    );
}
