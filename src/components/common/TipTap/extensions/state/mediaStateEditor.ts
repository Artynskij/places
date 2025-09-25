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
                        // Создаем новый массив (не мутируем старый)
                        editor.storage.mediaStore.items = [
                            ...editor.storage.mediaStore.items.slice(0, index),
                            updatedMedia,
                            ...editor.storage.mediaStore.items.slice(index + 1),
                        ];
                    }
                    return true;
                },
        };
    },

    // ✅ Добавляем ProseMirror plugin для точного отслеживания удаления
    addProseMirrorPlugins() {
        const { editor } = this;

        return [
            new Plugin({
                key: new PluginKey("mediaStorePlugin"),

                // ✅ Отслеживаем изменения в документе
                appendTransaction: (transactions, oldState, newState) => {
                    // Если нет изменений в документе, выходим
                    if (!transactions.some((tr) => tr.docChanged)) {
                        return null;
                    }

                    // Собираем ID медиа из старого документа
                    const oldMediaIds = new Set<string>();
                    oldState.doc.descendants((node) => {
                        if (node.attrs?.mediaId) {
                            oldMediaIds.add(node.attrs.mediaId);
                        }
                    });

                    // Собираем ID медиа из нового документа
                    const newMediaIds = new Set<string>();
                    newState.doc.descendants((node) => {
                        if (node.attrs?.mediaId) {
                            newMediaIds.add(node.attrs.mediaId);
                        }
                    });

                    // Находим удаленные ID (есть в старом документе, но нет в новом)
                    const removedMediaIds = Array.from(oldMediaIds).filter(
                        (id) => !newMediaIds.has(id)
                    );

                    // Если есть удаленные медиа, очищаем их из хранилища
                    if (removedMediaIds.length > 0) {
                        const tr = newState.tr;

                        removedMediaIds.forEach((mediaId) => {
                            editor.commands.removeMedia(mediaId);
                        });

                        // Можно добавить мета-информацию для отладки
                        tr.setMeta("mediaStore", {
                            removed: removedMediaIds,
                            timestamp: Date.now(),
                        });

                        return tr;
                    }

                    return null;
                },

                // ✅ Дополнительно: отслеживаем конкретные операции удаления
                filterTransaction: (transaction, state) => {
                    // Логируем операции удаления для отладки
                    if (transaction.getMeta("removeNode")) {
                        const removedNode = transaction.getMeta("removeNode");
                        if (removedNode?.attrs?.mediaId) {
                            console.log(
                                "Node removed with mediaId:",
                                removedNode.attrs.mediaId
                            );
                        }
                    }
                    return true;
                },
            }),
        ];
    },

    // ✅ Сохраняем ваш существующий метод onUpdate как резервный
    onUpdate() {
        if (!this.editor) return;

        const usedMediaIds = new Set<string>();

        // Рекурсивно собираем все mediaId из документа
        const collectMediaIds = (node: any) => {
            if (node.attrs?.mediaId) {
                usedMediaIds.add(node.attrs.mediaId);
            }

            if (node.content) {
                node.content.forEach(collectMediaIds);
            }
        };

        // Собираем mediaId из всего документа
        collectMediaIds(this.editor.getJSON());

        // Удаляем медиа, которые больше не используются в документе
        this.editor.storage.mediaStore.items =
            this.editor.storage.mediaStore.items.filter(
                (item: IMediaFrontWithFile) => usedMediaIds.has(item.id)
            );
    },
});

export default MediaStateExtension;
