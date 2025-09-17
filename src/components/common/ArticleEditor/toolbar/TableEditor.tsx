"use client";
import "../articleEditor.scss";
import { Button, Space } from "antd";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface TableEditorProps {
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}

function TableEditor({ editor, children }: TableEditorProps) {
    const [showTableControls, setShowTableControls] = useState(false);
    const addRow = () => editor.chain().focus().addRowAfter().run();
    const deleteRow = () => editor.chain().focus().deleteRow().run();
    const addColumn = () => editor.chain().focus().addColumnAfter().run();
    const deleteColumn = () => editor.chain().focus().deleteColumn().run();
    const deleteTable = () => editor.chain().focus().deleteTable().run();
    
    const handlerCreateTable = () => {
        editor
            .chain()
            .focus()
            .insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true,
            })
            .run();
    };
    useEffect(() => {
        if (!editor) return;

        const update = () => {
            setShowTableControls(editor.isActive("table"));
        };

        editor.on("selectionUpdate", update);
        return () => {
            editor.off("selectionUpdate", update);
        };
    }, [editor]);
    return (
        <>
            <div onClick={handlerCreateTable}>{children}</div>
            {showTableControls && (
                <div className="table-controls">
                    <Space>
                        <Button size="small" onClick={addColumn}>
                            +Колонка
                        </Button>
                        <Button size="small" onClick={deleteColumn}>
                            -Колонка
                        </Button>
                        <Button size="small" onClick={addRow}>
                            +Строка
                        </Button>
                        <Button size="small" onClick={deleteRow}>
                            -Строка
                        </Button>
                        <Button size="small" danger onClick={deleteTable}>
                            Удалить
                        </Button>
                    </Space>
                </div>
            )}
        </>
    );
}
export default TableEditor;
