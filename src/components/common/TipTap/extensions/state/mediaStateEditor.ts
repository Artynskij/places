import { IMediaFrontWithFile } from "@/lib/models";
import { Extension, CommandProps } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mediaStore: {
            addMedia: (media: IMediaFrontWithFile) => ReturnType;
            removeMedia: (mediaId: string) => ReturnType;
            clearMedia: () => ReturnType;
            updateMediaInStorage: (
                updatedMedia: IMediaFrontWithFile
            ) => ReturnType;
            setMediaStorage: (mediaItems: IMediaFrontWithFile[]) => ReturnType;
        };
    }

    interface Storage {
        mediaStore: {
            items: IMediaFrontWithFile[];
            getMedia: () => IMediaFrontWithFile[];
            getMediaById: (id: string) => IMediaFrontWithFile | undefined;
        };
    }
}

const MediaStateExtension = Extension.create({
    name: "mediaStore",

    addStorage() {
        return {
            items: [] as IMediaFrontWithFile[],

            getMedia() {
                return this.items;
            },

            getMediaById(id: string) {
                return this.items.find(
                    (item: IMediaFrontWithFile) => item.id === id
                );
            },
        };
    },

    addCommands() {
        return {
            addMedia:
                (media: IMediaFrontWithFile) =>
                ({ editor }: CommandProps) => {
                    if (
                        !editor.storage.mediaStore.items.find(
                            (item: IMediaFrontWithFile) => item.id === media.id
                        )
                    ) {
                        editor.storage.mediaStore.items.push(media);
                    }
                    return true;
                },

            removeMedia:
                (mediaId: string) =>
                ({ editor }: CommandProps) => {
                    editor.storage.mediaStore.items =
                        editor.storage.mediaStore.items.filter(
                            (item: IMediaFrontWithFile) => item.id !== mediaId
                        );

                    return true;
                },

            clearMedia:
                () =>
                ({ editor }: CommandProps) => {
                    editor.storage.mediaStore.items = [];
                    return true;
                },

            updateMediaInStorage:
                (updatedMedia: IMediaFrontWithFile) =>
                ({ editor }: CommandProps) => {
                    const index = editor.storage.mediaStore.items.findIndex(
                        (item: IMediaFrontWithFile) =>
                            item.id === updatedMedia.id
                    );

                    if (index !== -1) {
                        editor.storage.mediaStore.items = [
                            ...editor.storage.mediaStore.items.slice(0, index),
                            updatedMedia,
                            ...editor.storage.mediaStore.items.slice(index + 1),
                        ];
                    }
                    return true;
                },
            setMediaStorage:
                (mediaItems: IMediaFrontWithFile[]) =>
                ({ editor }: CommandProps) => {
                    editor.storage.mediaStore.items = [...mediaItems];
                    return true;
                },
        };
    },

    // ✅ ВРЕМЕННО отключаем ВСЮ авто-очистку в ProseMirror plugin
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("mediaStorePlugin"),
                // ❌ ПУСТОЙ ПЛАГИН - НИКАКОЙ АВТО-ОЧИСТКИ
            }),
        ];
    },

    // ❌ ВРЕМЕННО ОТКЛЮЧАЕМ onUpdate очистку - ЗАКОММЕНТИРОВАТЬ ВСЮ ФУНКЦИЮ
    onUpdate() {
        if (!this.editor) return;

        const usedMediaIds = new Set<string>();

        // Собираем все используемые mediaId из контента
        const collectMediaIds = (node: any) => {
            if (node.attrs?.mediaId) {
                usedMediaIds.add(node.attrs.mediaId);
            }
            if (node.attrs?.slides) {
                node.attrs?.slides.forEach((item: any) => {
                    usedMediaIds.add(item.mediaId);
                });
            }
            if (node.content) {
                node.content.forEach(collectMediaIds);
            }
        };
        collectMediaIds(this.editor.getJSON());

        // Фильтруем медиа, оставляя только используемые
        const previousItems = this.editor.storage.mediaStore.items;
        const newItems = previousItems.filter((item) =>
            usedMediaIds.has(item.id)
        );

        // Обновляем storage только если есть изменения
        if (newItems.length !== previousItems.length) {
            this.editor.storage.mediaStore.items = newItems;

            // Триггерим обновление родительского компонента
            const mediaStorage = this.editor.storage.mediaStore.items;
            const contentJson = this.editor.getJSON();

            // Нужно как-то сообщить родительскому компоненту об изменении
            // Это можно сделать через кастомное событие или колбэк
        }
    },
});

export default MediaStateExtension;
