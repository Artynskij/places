"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";

import style from "./inputFind.module.scss";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { ROUTES } from "@/lib/config/Routes";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

interface IInputFind {
    initialValue: string;
}
const InputFind = ({ initialValue }: IInputFind) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchQueryIndexSearch = searchParams.get(
        CONSTANT_SEARCH_PARAMS.INDEX_SEARCH
    ) as TTypesOfSearchKey | undefined;
    const [inputValue, setInputValue] = useState(initialValue);
    useEffect(() => {
        const searchQueryInput = searchParams.get(
            CONSTANT_SEARCH_PARAMS.SEARCH
        ) as string;
        setInputValue(searchQueryInput)
    }, [searchParams]);
    const handlerSearchClick = () => {
        router.replace(ROUTES.SEARCH(inputValue.toString()));
    };

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.replace(
            ROUTES.SEARCH(inputValue.toString(), searchQueryIndexSearch || "")
        );
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
