"use client";

import { notification } from "antd";
import { createContext, useContext, useMemo, useCallback } from "react";

type INotificationMessage = {
    message: string;
    description?: string;
    showProgress?: boolean;
};

type INotificationContext = {
    success: (prop: INotificationMessage) => void;
    info: (prop: INotificationMessage) => void;
    error: (prop: INotificationMessage) => void;
};

const NotificationContext = createContext<INotificationContext | undefined>(
    undefined
);

export const NotificationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [apiNotification, contextHolder] = notification.useNotification();

    // Используем useCallback для мемоизации функций
    const success = useCallback(
        ({ message, description, showProgress }: INotificationMessage) => {
            apiNotification.success({
                message: message,
                description: description,
                showProgress: true,
                placement: "bottomRight",
            });
        },
        [apiNotification]
    );

    const info = useCallback(
        ({ message, description, showProgress }: INotificationMessage) => {
            apiNotification.info({
                message: message,
                description: description,
                showProgress: true,
                placement: "bottomRight",
            });
        },
        [apiNotification]
    );

    const error = useCallback(
        ({ message, description, showProgress }: INotificationMessage) => {
            apiNotification.error({
                message: message,
                description: description,
                showProgress: true,
                placement: "bottomRight",
            });
        },
        [apiNotification]
    );

    const contextValue = useMemo(
        (): INotificationContext => ({
            success,
            info,
            error,
        }),
        [success, info, error]
    );

    return (
        <NotificationContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification used without Provider");
    return context;
};
