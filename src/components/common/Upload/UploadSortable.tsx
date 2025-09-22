// components/UploadSortable.tsx
"use client";

import React from "react";
import { Upload, UploadFile } from "antd";
import type { UploadProps, UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";

interface UploadSortableProps
    extends Omit<UploadProps, "onChange" | "fileList"> {
    fileList: UploadFile[];
    onChange: (info: UploadChangeParam<UploadFile>) => void;
}

export const UploadSortable: React.FC<UploadSortableProps> = ({
    fileList,
    onChange,
}) => {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reordered = Array.from(fileList);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);

        onChange({
            file: removed,
            fileList: reordered,
            event: undefined,
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="upload-list" direction="horizontal">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                    >
                        {fileList.map((file, index) => (
                            <Draggable
                                key={file.uid}
                                draggableId={file.uid}
                                index={index}
                            >
                                {(providedDrag) => (
                                    <div
                                        ref={providedDrag.innerRef}
                                        {...providedDrag.draggableProps}
                                        {...providedDrag.dragHandleProps}
                                        style={{
                                            ...providedDrag.draggableProps
                                                .style,
                                            width: 100,
                                            height: 100,
                                            border: "1px solid #d9d9d9",
                                            borderRadius: 4,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            src={
                                                file.thumbUrl ||
                                                (file.originFileObj
                                                    ? URL.createObjectURL(
                                                          file.originFileObj
                                                      )
                                                    : "")
                                            }
                                            width={100}
                                            height={100}
                                            alt={file.name}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                            }}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        <Upload
                            listType="picture-card"
                            multiple
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={(info) => {
                                onChange(info);
                            }}
                            showUploadList={false} // 👈 скрываем стандартный список AntD
                        >
                            <div>
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Загрузить</div>
                            </div>
                        </Upload>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
