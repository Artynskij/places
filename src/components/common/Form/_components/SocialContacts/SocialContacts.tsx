// components/FormSocialNetworks.tsx
"use client";

import { FC, useState, useMemo } from "react";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { DeleteButton } from "@/components/common/ButtonFunctional/DeleteButton";

import style from "./socialContacts.module.scss";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/social-networks.const";
import { ISelectOption } from "@/lib/models";
import { TSocialNetworks } from "@/lib/models/types/TSocialNetworks";


interface SocialContact {
    type: TSocialNetworks;
    url: string;
}
interface Props {
    nameSelectImportant:string
    keysData:TSocialNetworks[];
    value: SocialContact[] | []; 
    onChange: (value: SocialContact[]) => void;
    errors?: Record<number, { url?: FieldError }>; 
}

export const SocialContactsBlockForm: FC<Props> = ({
    nameSelectImportant,
    keysData,
    value,
    onChange,
    errors,
}) => {
    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

    const usedTypes = useMemo(() => value.map((f) => f.type), [value]);

    const availableTypes = useMemo(
        () => [
            ...keysData.filter(
                (type) => !usedTypes.includes(type)
            ),
        ],
        [usedTypes]
    );

    const socialOptions: ISelectOption[] = availableTypes.map((type) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
    }));

    const handleSelect = (item: ISelectOption) => {
        if (!usedTypes.includes(item.value as TSocialNetworks)) {
            const newList = [
                ...value,
                {
                    id: item.id,
                    type: item.value as TSocialNetworks,
                    url: "",
                },
            ];
            onChange(newList);
            setSelectedSocial(null);
        }
    };

    const handleInputChange = (index: number, url: string) => {
        const updated = [...value];
        updated[index] = { ...updated[index], url };
        onChange(updated);
    };

    const handleRemove = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <>
            {value.map((field, index) => (
                <div key={field.type} className={style.socialRow}>
                    <InputForm
                        value={field.url || ""}
                        onChange={(e) =>
                            handleInputChange(index, e.target.value)
                        }
                        error={errors?.[index]?.url?.message}
                        titleSpan={
                            field.type.charAt(0).toUpperCase() +
                            field.type.slice(1)
                        }
                        placeholder="Введите ссылку"
                        type="text"
                    />
                    <DeleteButton onClick={() => handleRemove(index)} />
                </div>
            ))}

            {availableTypes.length > 0 && (
                <SelectCustom
                    nameSelectImportant={nameSelectImportant}
                    options={[...socialOptions]}
                    activeOption={selectedSocial}
                    onChange={(item) => {
                        setSelectedSocial(item.value);
                        handleSelect(item);
                    }}
                    classNameCtn={style.selectSocial}
                />
            )}
        </>
    );
};
