import { useState } from "react";
import { Modal, Input, Checkbox, Button } from "antd";
interface IProp {
    editor: any;
    children: React.ReactNode | React.ReactNode[];
}
export const LinkModalEditor = ({ editor, children }: IProp) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [noindex, setNoindex] = useState(false);

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
            <div style={{ display: "inline-block" }}  onClick={() => setOpen(true)}>{children}</div>
            {/* <Button
                icon={<LinkOutlined />}
                type={editor.isActive("link") ? "primary" : "default"}
                onClick={() => setOpen(true)}
            /> */}
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
