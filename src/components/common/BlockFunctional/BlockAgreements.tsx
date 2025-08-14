import style from "./blockFunctional.module.scss";
import { CONSTANT_AGREEMENTS_DATA } from "@/asset/constants/AgreementsData";
import { CheckBox as CheckBoxCustom } from "@/components/UI/CheckBox/CheckBox";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { TAgreementKey } from "@/lib/models/types/TAgreementKey";
import { Checkbox } from "antd";
import * as Yup from "yup";

interface IBlockAgreements {
    agreementKeys: string[]; // какие value показывать
    value: string[]; // выбранные value
    onChange: (checkedValues: string[]) => void;
    error?: string;
}
export const BlockAgreements = ({
    agreementKeys,
    value,
    onChange,
    error,
}: IBlockAgreements) => {
    const filteredAgreements = CONSTANT_AGREEMENTS_DATA.filter((item) =>
        agreementKeys.includes(item.value)
    );
    return (
        <div className={style.blockAgreements}>
            <Checkbox.Group value={value} onChange={onChange}>
                <ul className={style.blockAgreements_list}>
                    {filteredAgreements.map((agreementItem) => {
                        return (
                            <li
                                className={style.blockAgreements_list_item}
                                key={agreementItem.value}
                            >
                                <CheckBoxCustom
                                    name={`${
                                        agreementItem.required ? "*" : ""
                                    }${agreementItem.title}`}
                                    value={agreementItem.value}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Checkbox.Group>

            {error && <SpanErrorForm text={error} />}
        </div>
    );
};

export const getAgreementsValidation = (usedKeys: TAgreementKey[]) => {
    const requiredKeys = CONSTANT_AGREEMENTS_DATA.filter(
        (a) => a.required && usedKeys.includes(a.value)
    ).map((a) => a.value);

    return Yup.array()
        .of(Yup.string())
        .test(
            "required-agreements",
            "Вы должны принять обязательные соглашения",
            (selected) => requiredKeys.every((key) => selected?.includes(key))
        );
};
