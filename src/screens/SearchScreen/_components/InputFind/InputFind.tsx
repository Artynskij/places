"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";

import style from "./inputFind.module.scss";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { ROUTES } from "@/lib/config/Routes";

interface IInputFind {
    initialValue: string;
}
const InputFind = ({ initialValue }: IInputFind) => {
    const router = useRouter();

    const [inputValue, setInputValue] = useState(initialValue);
    const handlerSearchClick = () => {
        router.replace(ROUTES.SEARCH(inputValue.toString()));
    };

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        router.replace(ROUTES.SEARCH(inputValue.toString()));
    };
    return (
        <form onSubmit={handlerSubmit} className={style.ctn}>
            <InputCustom
                classNameCtn={style.inputCtn}
                classNameInput={style.input}
                placeholder="поиск"
                value={inputValue}
                setValue={setInputValue}
                ariaLabel="Поиск по сайту"
            />
            <Button
                onClick={handlerSearchClick}
                className={style.button}
                text="Поиск"
            />
        </form>
    );
};
export default InputFind;
