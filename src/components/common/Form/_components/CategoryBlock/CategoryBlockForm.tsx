"use client";

import style from "./categoryBlockForm.module.scss";
import { Select } from "antd";
import { useEffect, useState } from "react";

import { ICategoryFront } from "@/lib/models";
import { useLocale } from "next-intl";
import { FieldError } from "react-hook-form";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";

interface Props {
    selectedCategories?: string[];
    onChange?: (value: string[]) => void;
    error: FieldError | null;
}

const CategoryBlockForm = ({
    selectedCategories = [],
    onChange,
    error,
}: Props) => {
    const dataLoadManagementService = new DataLoadManagementService();
    const locale = useLocale();
    const [categories, setCategories] = useState<ICategoryFront[]>([]);

    useEffect(() => {
        dataLoadManagementService.getCategories(locale).then((res) => {
            if (res) {
                setCategories(res);
            }
        });
    }, []);

    return (
        <div className={style.categoryBlockForm}>
            <Select
                mode="multiple"
                allowClear
                showSearch
                optionFilterProp="label" // 👈 включаем поиск по label
                style={{ width: "100%" }}
                placeholder="Выберите категории"
                value={selectedCategories.map(String)} // 👈 убедись, что строки
                onChange={(value) => {
                    onChange?.(value);
                }}
                options={categories.map((cat) => ({
                    label: cat.value,
                    value: String(cat.id),
                }))}
            />

            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};

export default CategoryBlockForm;
