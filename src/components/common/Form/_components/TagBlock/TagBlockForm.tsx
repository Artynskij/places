"use client";
import style from "./tagBlockForm.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { ITagBlockFront } from "@/lib/models";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Select, Tag } from "antd";
import { FieldError } from "react-hook-form";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";

interface Props {
    selectedTags?: string[];
    onChange?: (value: string[]) => void;
    error: FieldError | null;
}

const TagBlockForm = ({ selectedTags = [], onChange, error }: Props) => {
    // const tTags = useTranslations("Tags");
    const services = useMemo(
        () => ({
            tag: new DataLoadManagementService(),
        }),
        []
    );

    const locale = useLocale();
    const [activePopup, setActivePopup] = useState(false);
    const [tagsGrouped, setTagsGrouped] = useState<ITagBlockFront[]>([]);
    const [expandedGroups, setExpandedGroups] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        services.tag.getBlockTags(locale).then((res) => {
            if (res) setTagsGrouped(res);
        });
    }, [services, locale]);

    const handleTagToggle = (tagId: string) => {
        const stringTagId = String(tagId);
        const isCurrentlySelected = selectedTags.includes(stringTagId);

        let newSelectedTags: string[];

        if (isCurrentlySelected) {
            // Удаляем тег
            newSelectedTags = selectedTags.filter((id) => id !== stringTagId);
        } else {
            // Добавляем тег
            newSelectedTags = [...selectedTags, stringTagId];
        }

        onChange?.(newSelectedTags);
    };

    const isTagSelected = (tagId: string): boolean => {
        return selectedTags.includes(String(tagId));
    };

    const getTagLabelById = (id: string) => {
        for (const group of tagsGrouped) {
            const tag = group.tags.find((t) => String(t.id) === id);
            if (tag) return tag.value;
        }
        return id;
    };

    const toggleGroupExpansion = (groupKey: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupKey]: !prev[groupKey],
        }));
    };

    const renderTagGroup = (group: ITagBlockFront) => {
        const groupKey = group.groupKey.key;
        const isExpanded = expandedGroups[groupKey];
        const displayTags = isExpanded ? group.tags : group.tags.slice(0, 30);
        const hasMoreTags = group.tags.length > 30;

        return (
            <div key={groupKey} className={style.tagGroup}>
                <h4 className={style.tagGroup_title}>
                    {group.groupKey.value}:
                </h4>
                <div className={style.tagList}>
                    {displayTags.map((tag) => {
                        const tagId = String(tag.id);
                        const isSelected = isTagSelected(tagId);

                        return (
                            <Tag
                                key={tagId}
                                bordered={false}
                                color={isSelected ? "gold" : "default"}
                                onClick={() => handleTagToggle(tagId)}
                                style={{
                                    cursor: "pointer",
                                    marginBottom: "8px",
                                    padding: "3px 6px",
                                    border: isSelected ? "1px solid gold" : "",
                                }}
                            >
                                {tag.value}
                            </Tag>
                        );
                    })}
                </div>
                {hasMoreTags && (
                    // <Button
                    //     typeLogic="button"
                    //     onClick={() => toggleGroupExpansion(groupKey)}
                    //     text={isExpanded ? "Скрыть" : `Показать все (${group.tags.length})`}
                    //     className={style.showMoreButton}
                    // />

                    <Tag
                        color="blue"
                        onClick={() => toggleGroupExpansion(groupKey)}
                        style={{
                            cursor: "pointer",
                            marginBottom: "8px",
                            padding: "3px 6px",
                        }}
                    >
                        {isExpanded
                            ? "Скрыть"
                            : `Показать все (${group.tags.length})`}
                    </Tag>
                )}
            </div>
        );
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
                <div className={style.allGroupsContainer}>
                    {tagsGrouped.map(renderTagGroup)}
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
                    <h4>Выбранные характеристики:</h4>
                    <div className={style.selectedTags}>
                        {selectedTags.map((id) => (
                            <Tag
                                style={{ marginBottom: "8px" }}
                                key={id}
                                color="blue"
                                closable
                                onClose={() => handleTagToggle(id)}
                            >
                                {getTagLabelById(id)}
                            </Tag>
                        ))}
                    </div>
                </div>
            )}

            {error && <SpanErrorForm text={error.message || ""} />}
        </div>
    );
};

export default TagBlockForm;
