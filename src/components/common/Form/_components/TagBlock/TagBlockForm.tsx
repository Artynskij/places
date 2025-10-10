"use client";
import style from "./tagBlockForm.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { ITagBlockFront } from "@/lib/models";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import { FieldError } from "react-hook-form";
import { IconCancel } from "@/components/common/Icons";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";

const { Option } = Select;

interface Props {
    selectedTags?: string[];
    onChange?: (value: string[]) => void;
    error: FieldError | null;
}

const TagBlockForm = ({ selectedTags = [], onChange, error }: Props) => {
    const tTags = useTranslations("Tags");
    const tagService = new DataLoadManagementService();
    const locale = useLocale();
    const [activePopup, setActivePopup] = useState(false);
    const [tagsGrouped, setTagsGrouped] = useState<ITagBlockFront[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    useEffect(() => {
        tagService.getBlockTags(locale).then((res) => {
            if (res) setTagsGrouped(res);
        });
    }, []);

    // Автоматически определяем выбранные группы на основе selectedTags
    useEffect(() => {
        if (tagsGrouped.length > 0 && selectedTags.length > 0) {
            const groupsWithSelectedTags = tagsGrouped
                .filter(group => 
                    group.tags.some(tag => 
                        selectedTags.includes(String(tag.id))
                    )
                )
                .map(group => group.groupKey.key);
            
            setSelectedGroups(prev => {
                // Убираем дубликаты и сохраняем только уникальные группы
                const uniqueGroups = [...new Set([...prev, ...groupsWithSelectedTags])];
                return uniqueGroups;
            });
        }
    }, [tagsGrouped, selectedTags]);

    const handleGroupSelect = (groupKey: string) => {
        if (!selectedGroups.includes(groupKey)) {
            setSelectedGroups((prev) => [...prev, groupKey]);
        }
    };

    const handleTagChange = (groupKey: string, selectedTagIds: string[]) => {
        const group = tagsGrouped.find((g) => g.groupKey.key === groupKey);
        const groupTagIds = group?.tags.map((t) => String(t.id)) || [];

        // оставляем теги, не относящиеся к текущей группе, и добавляем новые из текущей
        const newValue = [
            ...selectedTags.filter((id) => !groupTagIds.includes(id)),
            ...selectedTagIds,
        ];

        onChange?.(newValue);
    };

    const handleDeleteGroupSelect = (groupKey: string) => {
        const group = tagsGrouped.find((g) => g.groupKey.key === groupKey);
        if (!group) return;

        const groupTagIds = group.tags.map((tag) => String(tag.id));

        // Удаляем теги этой группы из общего списка
        const updatedTags = selectedTags.filter(
            (id) => !groupTagIds.includes(id)
        );

        onChange?.(updatedTags);

        // Удаляем саму группу из выбранных
        setSelectedGroups((prev) =>
            prev.filter((prevItem) => prevItem !== groupKey)
        );
    };

    const getSelectedTagsForGroup = (groupKey: string): string[] => {
        const group = tagsGrouped.find((g) => g.groupKey.key === groupKey);
        if (!group) return [];

        return group.tags
            .map((tag) => String(tag.id))
            .filter((id) => selectedTags.includes(id));
    };

    const getTagLabelById = (id: string) => {
        for (const group of tagsGrouped) {
            const tag = group.tags.find((t) => String(t.id) === id);
            if (tag) return tag.value;
        }
        return id;
    };

    return (
        <div className={style.tagBlockForm}>
            <Button
                className={style.tagBlockForm_button}
                typeLogic="button"
                onClick={() => setActivePopup(true)}
                text="Характеристики объекта"
            />

            <ModalCustom
                view="middle"
                title="Характеристики объекта"
                active={activePopup}
                closeModal={() => setActivePopup(false)}
                zIndex={11}
            >
                <div>
                    {/* Выбор группы тегов */}
                    <Select
                        style={{ width: "100%", marginBottom: 16 }}
                        placeholder="Выберите группу"
                        onChange={handleGroupSelect}
                        options={tagsGrouped
                            .filter(
                                (group) =>
                                    !selectedGroups.includes(group.groupKey.key)
                            )
                            .map((group) => ({
                                value: group.groupKey.key,
                                label: tTags(group.groupKey.key),
                            }))}
                        value={undefined}
                        optionFilterProp="label"
                    />

                    {/* Селекты тегов по группам */}
                    {selectedGroups.map((groupKey) => {
                        const group = tagsGrouped.find(
                            (g) => g.groupKey.key === groupKey
                        );
                        if (!group) return null;

                        return (
                            <div key={groupKey} className={style.selectGroup}>
                                <label className={style.selectGroup_title}>
                                    <span> {tTags(groupKey)}</span>

                                    <IconCancel
                                        onClick={() =>
                                            handleDeleteGroupSelect(groupKey)
                                        }
                                        className={style.iconCancel}
                                    />
                                </label>
                                <Select
                                    mode="multiple"
                                    showSearch
                                    optionFilterProp="label"
                                    filterOption={(input, option) =>
                                        (option?.label as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    style={{ width: "100%" }}
                                    placeholder="Выберите характеристики"
                                    value={getSelectedTagsForGroup(groupKey)}
                                    onChange={(selected) =>
                                        handleTagChange(groupKey, selected)
                                    }
                                    options={group.tags.map((tag) => ({
                                        value: String(tag.id),
                                        label: tag.value,
                                    }))}
                                />
                            </div>
                        );
                    })}
                </div>
                <Button
                    onClick={() => setActivePopup(false)}
                    text="Подтвердить"
                    className={style.button_accept}
                />
            </ModalCustom>

            {/* Вывод всех выбранных тегов (например, для формы) */}
            {selectedTags.length > 0 && (
                <div className={style.selectedList}>
                    {selectedTags.map((id) => (
                        <Tag key={id}>{getTagLabelById(id)}</Tag>
                    ))}
                </div>
            )}

            {error && <SpanErrorForm text={error.message || ""} />}
        </div>
    );
};

export default TagBlockForm;