"use client";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { SliderBase } from "./SliderBase";
import { useSliderData } from "@/lib/hooks/useSlidesEditor";

interface IProp extends Partial<NodeViewProps> {
    node?: any;
}

export const SliderEditor = ({ node, editor }: IProp) => {
    const { slides, isLoading } = useSliderData({
        node: node,
        editor: editor,
    });


    return (
        <NodeViewWrapper>
            <SliderBase
                slides={slides}
                showSkeleton={false}
                isLoading={isLoading}
            />
        </NodeViewWrapper>
    );
};
