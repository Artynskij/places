// extensions/slider/SliderNodeForViewer.ts
import { mergeAttributes, Node } from "@tiptap/react";
import { IMediaFront } from "@/lib/models";

export const SliderNodeForViewer = (mediaCollection: IMediaFront[]) => {
    return Node.create({
        name: "slider",
        group: "block",

        addAttributes() {
            return {
                id: {
                    default: "",
                    parseHTML: (element) =>
                        element.getAttribute("data-slider-id"),
                    renderHTML: (attributes) => ({
                        "data-slider-id": attributes.id,
                    }),
                },
                slides: {
                    default: [],
                    parseHTML: (element) => {
                        const slidesData = element.getAttribute("data-slides");
                        try {
                            return slidesData ? JSON.parse(slidesData) : [];
                        } catch (error) {
                            console.error("❌ Error parsing slides:", error);
                            return [];
                        }
                    },
                    renderHTML: (attributes) => {
                        const slidesFromAttrs = attributes.slides || [];

                        // ✅ Фильтруем только существующие медиа
                        const restoredSlides = slidesFromAttrs
                            .map((slide: { mediaId: string }) => {
                                const mediaExists = mediaCollection.some(
                                    (m) => m.id === slide.mediaId
                                );
                                return mediaExists ? slide : null;
                            })
                            .filter(Boolean);

                        return {
                            "data-slides": JSON.stringify(restoredSlides),
                        };
                    },
                },
            };
        },
        parseHTML() {
            return [
                {
                    tag: 'div[data-type="slider"]',
                    getAttrs: (dom) => {
                        return {
                            id: dom.getAttribute("data-slider-id"),
                            slides: JSON.parse(
                                dom.getAttribute("data-slides") || "[]"
                            ),
                        };
                    },
                },
            ];
        },
        renderHTML({ HTMLAttributes }) {
            // ✅ Проверим ВСЕ возможные варианты
            const id =
                HTMLAttributes.id || HTMLAttributes["data-slider-id"] || "";

            let slides = [];
            // Пробуем разные варианты получения slides
            if (Array.isArray(HTMLAttributes.slides)) {
                slides = HTMLAttributes.slides;
            } else if (HTMLAttributes["data-slides"]) {
                try {
                    slides = JSON.parse(HTMLAttributes["data-slides"]);
                } catch (error) {
                    console.error("❌ Error parsing data-slides:", error);
                }
            }
            return [
                "div",
                mergeAttributes(HTMLAttributes, {
                    "data-type": "slider",
                    "data-slider-id": id,
                    "data-slides": JSON.stringify(slides),
                    class: "slider-container",
                }),
            ];
        },
    });
};
