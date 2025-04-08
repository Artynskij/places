"use client";

import { createContext, useContext } from "react";
import { message } from "antd";

type IAlertMessageContext = {
    success: (text: string) => void;
    error: (text: string) => void;
    info: (text: string) => void;
    warning: (text: string) => void;
};

const AlertMessageContext = createContext<IAlertMessageContext | undefined>(
    undefined
);

export const AlertMessageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (text: string) => messageApi.success(text);
    const error = (text: string) => messageApi.error(text);
    const info = (text: string) => messageApi.info(text);
    const warning = (text: string) => messageApi.warning(text);

    return (
        <AlertMessageContext.Provider value={{ success, error, info, warning }}>
            {contextHolder}
            {children}
        </AlertMessageContext.Provider>
    );
};

export const useAlertMessage = () => {
    const context = useContext(AlertMessageContext);
    if (!context) throw new Error("useAlertMessage used without Provider");
    return context;
};
