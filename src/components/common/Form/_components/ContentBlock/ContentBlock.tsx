"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { DeleteButton } from "@/components/common/ButtonFunctional/DeleteButton";

import style from "./contentBlock.module.scss";
import { ISelectOption } from "@/lib/models";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
// если у тебя есть список языков — подставь свой
const LANGUAGES = ["en", "fr", "ru", "de"];

interface KeyValue {
    key: string;
    value: string;
}

interface LangValue {
    lang: string;
    value: {
        details: {
            title: string;
            description: string;
        };
        seo?: KeyValue[] | null;
        seoTrip?: KeyValue[] | null;
        location: {
            street1?: string | null;
            street2?: string | null;
        };
    };
}
type LangItemError = Merge<FieldError, FieldErrorsImpl<LangValue>>;
type ContentErrors = FieldError | (LangItemError | undefined)[];
interface Props {
    value: LangValue[];
    onChange: (value: LangValue[]) => void;
    errors?: ContentErrors;
    withSeo?: boolean; // 👈 SEO только в админке
}

export const FormLanguagesBlock: FC<Props> = ({
    value,
    onChange,
    errors,
    withSeo = false,
}) => {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);

    const usedLangs = useMemo(() => value.map((f) => f.lang), [value]);

    const availableLangs = useMemo(
        () => LANGUAGES.filter((l) => !usedLangs.includes(l)),
        [usedLangs]
    );

    const langOptions: ISelectOption[] = availableLangs.map((lang) => ({
        name: lang.toUpperCase(),
        value: lang,
    }));

    const handleSelect = (item: ISelectOption) => {
        if (!usedLangs.includes(item.value)) {
            const newList = [
                ...value,
                {
                    lang: item.value,
                    value: {
                        details: { title: "", description: "" },
                        seo: [],
                        location: { street1: "", street2: "" },
                    },
                },
            ];
            onChange(newList);
            setSelectedLang(null);
        }
    };

    const handleChangeField = (
        index: number,
        path: string,
        fieldValue: string
    ) => {
        const updated = [...value];
        const paths = path.split(".");
        let obj: any = updated[index].value;
        for (let i = 0; i < paths.length - 1; i++) {
            obj = obj[paths[i]];
        }
        obj[paths[paths.length - 1]] = fieldValue;
        onChange(updated);
    };

    const handleRemove = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        onChange(updated);
    };

    // ==== SEO HANDLERS (только если withSeo === true) ====
    const handleSeoChange = (
        index: number,
        i: number,
        field: "key" | "value",
        val: string
    ) => {
        const updated = [...value];
        const arr = updated[index].value.seo || [];
        arr[i] = { ...arr[i], [field]: val };
        updated[index].value.seo = arr;
        onChange(updated);
    };

    const handleSeoAdd = (index: number) => {
        const updated = [...value];
        const arr = updated[index].value.seo || [];
        arr.push({ key: "", value: "" });
        updated[index].value.seo = arr;
        onChange(updated);
    };

    const handleSeoRemove = (index: number, i: number) => {
        const updated = [...value];
        const arr = updated[index].value.seo || [];
        updated[index].value.seo = arr.filter((_, j) => j !== i);
        onChange(updated);
    };
    const itemErr = (index: number) =>
        Array.isArray(errors) ? errors[index] : undefined;

    const rootErr = !Array.isArray(errors) ? errors : undefined;
    return (
        <div className={style.contentBlock}>
            {value.map((field, index) => (
                <div key={field.lang} className={style.langBlock}>
                    <div className={style.title}>
                        <h4>{field.lang.toUpperCase()}</h4>
                        <DeleteButton onClick={() => handleRemove(index)} />
                    </div>

                    <div className={style.inputs}>
                        <InputForm
                            value={field.value.details.title || ""}
                            onChange={(e) =>
                                handleChangeField(
                                    index,
                                    "details.title",
                                    e.target.value
                                )
                            }
                            error={
                                itemErr(index)?.value?.details?.title?.message
                            }
                            titleSpan="Заголовок"
                            placeholder="Введите заголовок"
                        />
                        <InputForm
                            value={field.value.details.description || ""}
                            onChange={(e) =>
                                handleChangeField(
                                    index,
                                    "details.description",
                                    e.target.value
                                )
                            }
                            error={
                                itemErr(index)?.value?.details?.description
                                    ?.message
                            }
                            titleSpan="Описание"
                            placeholder="Введите описание"
                        />
                        <InputForm
                            value={field.value.location.street1 || ""}
                            onChange={(e) =>
                                handleChangeField(
                                    index,
                                    "location.street1",
                                    e.target.value
                                )
                            }
                            // error={
                            //     errors?.[index]?.value?.location?.street1
                            //         ?.message
                            // }
                            titleSpan="Street 1"
                            placeholder="Введите улицу 1"
                        />
                        <InputForm
                            value={field.value.location.street2 || ""}
                            onChange={(e) =>
                                handleChangeField(
                                    index,
                                    "location.street2",
                                    e.target.value
                                )
                            }
                            // error={
                            //     errors?.[index]?.value?.location?.street2
                            //         ?.message
                            // }
                            titleSpan="Street 2"
                            placeholder="Введите улицу 2"
                        />
                    </div>

                    {/* === SEO блок только если withSeo === */}
                    {withSeo && (
                        <div className={style.seoSection}>
                            <h5>SEO</h5>
                            {field.value.seo?.map((seoItem, i) => (
                                <div key={i} className={style.keyValueRow}>
                                    <InputForm
                                        value={seoItem.key}
                                        onChange={(e) =>
                                            handleSeoChange(
                                                index,
                                                i,
                                                "key",
                                                e.target.value
                                            )
                                        }
                                        // error={
                                        //     errors?.[index]?.value?.seo?.[i]
                                        //         ?.key?.message
                                        // }
                                        titleSpan="Key"
                                        placeholder="Введите ключ"
                                    />
                                    <InputForm
                                        value={seoItem.value}
                                        onChange={(e) =>
                                            handleSeoChange(
                                                index,
                                                i,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        // error={
                                        //     errors?.[index]?.value?.seo?.[i]
                                        //         ?.value?.message
                                        // }
                                        titleSpan="Value"
                                        placeholder="Введите значение"
                                    />
                                    <DeleteButton
                                        onClick={() =>
                                            handleSeoRemove(index, i)
                                        }
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleSeoAdd(index)}
                            >
                                + Добавить SEO
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {availableLangs.length > 0 && (
                <SelectCustom
                    nameSelectImportant={"Добавить язык"}
                    options={langOptions}
                    activeOption={selectedLang}
                    onChange={(item) => {
                        setSelectedLang(item.value);
                        handleSelect(item);
                    }}
                    classNameCtn={style.selectLang}
                />
            )}
            {/* {typeof errors?.message && <SpanErrorForm text={errors.message} />} */}
            {(rootErr?.message || (rootErr as any)?.root?.message) && (
                <SpanErrorForm
                    text={rootErr?.message ?? (rootErr as any)?.root?.message}
                />
            )}
        </div>
    );
};
