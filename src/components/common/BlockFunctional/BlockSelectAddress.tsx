import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import style from "./blockFunctional.module.scss";
import { IOption } from "@/lib/models";

export const BlockSelectAddress = () => {
    const selectOptions: IOption[] = [
        { id: 1, label: "1", value: "one" },
        { id: 2, label: "2", value: "Two" },
    ];
    return (
        <div className={style.blockSelectAddress}>
            <div className={style.title}>Адрес проживания</div>
            <div className={style.blockSelectAddress_content}>
                <div className={style.select_container}>
                    <span>Страна</span>
                    <SelectCustom
                        options={selectOptions}
                        activeOption={selectOptions[0].value}
                        onChange={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};
