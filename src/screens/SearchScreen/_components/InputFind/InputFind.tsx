"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/UI/Button/Button";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";

import style from "./inputFind.module.scss";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
const InputFind = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [inputValue, setInputValue] = useState("");
    const handlerSearchClick = () => {
        router.replace(
            `${pathname}?${
                CONSTANT_SEARCH_PARAMS.SEARCH
            }=${inputValue.toString()}`
        );
    };
    return (
        <div className={style.ctn}>
            <InputCustom
                classNameCtn={style.inputCtn}
                classNameInput={style.input}
                placeholder="поиск"
                value={inputValue}
                setValue={setInputValue}
            />
            <Button
                onClick={handlerSearchClick}
                className={style.button}
                text="Поиск"
            />
        </div>
    );
};
export default InputFind;
