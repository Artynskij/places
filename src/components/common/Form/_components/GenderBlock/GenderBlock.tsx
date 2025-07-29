import style from "./genderBlock.module.scss";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";
import { TLocale } from "@/lib/models/types/TLocale";
import { Skeleton } from "antd";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
interface Props {
    selectedGender?: string;
    onChange?: (value: string) => void;
    error: FieldError | null;
}
export const GenderBlockForm = ({ selectedGender, onChange, error }: Props) => {
    const managerService = new DataLoadManagementService();
    const [genderData, setGenderData] = useState<IGenderFront[]>();
    const locale = useLocale();
    useEffect(() => {
        managerService.getGenders(locale).then((res) => {
            if (res) {
                setGenderData(res);
            }
        });
    }, []);
    if (!genderData)
        return (
            <div>
                <Skeleton.Input />
            </div>
        );

    return (
        <div>
            <SelectCustom
                classNameCtn={style.gender_select}
                activeOption={
                    genderData.find((item) => item.id === selectedGender)
                        ?.key as string
                }
                onChange={(value) => {
                    onChange?.(String(value.id));
                }}
                options={genderData.map((item) => {
                    return { name: item.value, value: item.key, id: item.id };
                })}
                title="Выбрать пол"
            />
            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};
