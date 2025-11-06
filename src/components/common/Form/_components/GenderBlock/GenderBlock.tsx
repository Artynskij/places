import style from "./genderBlock.module.scss";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { IGenderFront } from "@/lib/models/frontend/(person)/gender.front";
import { TLocale } from "@/lib/models/types/TLocale";
import { Skeleton } from "antd";

import useLocale from "@/lib/hooks/useLocale";
import { useEffect, useMemo, useState } from "react";
import { FieldError } from "react-hook-form";
interface Props {
    selectedGender?: string;
    onChange?: (value: string) => void;
    error: FieldError | null;
}
export const GenderBlockForm = ({ selectedGender, onChange, error }: Props) => {
    const services = useMemo(
        () => ({
            dataLoadManagement: new DataLoadManagementService(),
        }),
        []
    );
    const [genderData, setGenderData] = useState<IGenderFront[]>();
    const locale = useLocale();
    useEffect(() => {
        services.dataLoadManagement.getGenders(locale).then((res) => {
            if (res) {
                setGenderData(res);
            }
        });
    }, [services, locale]);
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
                    return { label: item.value, value: item.key, id: item.id };
                })}
                titleDefault="Выбрать пол"
            />
            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};
