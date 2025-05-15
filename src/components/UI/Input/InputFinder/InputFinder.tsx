import { KeyboardEvent, LegacyRef } from "react";
import style from "./inputFinder.module.scss";
import {
    IconArrowLeft,
    IconCancel,
    IconSearch,
} from "@/components/common/Icons";

interface IInputFinder {
    searchActive: boolean;
    refInput: LegacyRef<HTMLInputElement>;
    placeholder: string;
    inputValueActive: boolean;
    handlerCloseInput: () => void;
    handlerChangeInput: () => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handlerClearInput: () => void;
}
export const InputFinder = ({
    placeholder,
    refInput,
    searchActive,
    inputValueActive,
    handleKeyDown,
    handlerClearInput,
    handlerChangeInput,
    handlerCloseInput,
}: IInputFinder) => {
    return (
        <div className={style.blockFinder_input}>
            {searchActive ? (
                <IconArrowLeft
                    onClick={handlerCloseInput}
                    className={style.icon}
                />
            ) : (
                <IconSearch
                    style={{ fontSize: "20px" }}
                    className={style.icon}
                />
            )}

            <div className={style.ctnInput}>
                <input
                    placeholder={placeholder}
                    onChange={handlerChangeInput}
                    onKeyDown={handleKeyDown}
                    ref={refInput}
                    type="text"
                    maxLength={100}
                />
            </div>
            {searchActive && inputValueActive && (
                <IconCancel
                    onClick={handlerClearInput}
                    className={style.iconClear}
                />
            )}
        </div>
    );
};
