import { useEffect, useState } from "react";
import { Modal, Input, Checkbox, Button } from "antd";
interface IProp {
    editor: any;
    children: React.ReactNode | React.ReactNode[];
    // value: string;
}
export const LinkModalEditor = ({ editor, children }: IProp) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [noindex, setNoindex] = useState(false);

    useEffect(() => {
        if (!editor) return;

        const update = () => {
            const isLinkActive = editor.isActive("link");
            setOpen(isLinkActive);

            // Если ссылка активна, получаем её атрибуты
            if (isLinkActive) {
                const linkAttributes = editor.getAttributes("link");

                setUrl(linkAttributes.href || "");
                setNoindex(linkAttributes.rel === "nofollow");
            } else {
                // Сбрасываем значения, если ссылка не активна
                setUrl("");
                setNoindex(false);
            }
        };

        editor.on("selectionUpdate", update);
        return () => {
            editor.off("selectionUpdate", update);
        };
    }, [editor]);

    const applyLink = () => {
        if (!url) {
            setOpen(false);
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({
                href: url,
                rel: noindex ? "nofollow" : null,
            })
            .run();

        setOpen(false);
        setUrl("");
        setNoindex(false);
    };

    return (
        <>
            <div
                style={{ display: "inline-block" }}
                onClick={() => setOpen(true)}
            >
                {children}
            </div>

            <Modal
                title="Добавить ссылку"
                open={open}
                onOk={applyLink}
                onCancel={() => setOpen(false)}
            >
                <Input
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Checkbox
                    checked={noindex}
                    onChange={(e) => setNoindex(e.target.checked)}
                    style={{ marginTop: 12 }}
                >
                    {/* Не индексировать (rel="nofollow") */}
                    Не индексировать
                </Checkbox>
            </Modal>
        </>
    );
};
