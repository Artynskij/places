"use client";

import React, { createContext, useContext, useState } from "react";
type ITypeView = "table" | "list";
type ITypeViewData = {
    title: string;
    value: ITypeView;
    active: boolean;
};
type IViewTypeContext = {
    typeView: ITypeView;
    viewData: ITypeViewData[];
    toggleType: () => void;
};

const ViewTypeContext = createContext<IViewTypeContext | undefined>(undefined);

export const ViewTypeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [typeView, setTypeView] = useState<ITypeView>("list");
    const viewData: ITypeViewData[] = [
        { title: "Список", value: "list", active: typeView === "list" },
        { title: "Таблица", value: "table", active: typeView === "table" },
    ];
    const toggleType = () => {
        setTypeView((prevType) => (prevType === "list" ? "table" : "list"));
      
    };
    return (
        <ViewTypeContext.Provider value={{ typeView, viewData, toggleType }}>
            {children}
        </ViewTypeContext.Provider>
    );
};

export const useViewTypeList = () => {
    const context = useContext(ViewTypeContext);
    if (!context) throw new Error("useViewTypeList used without Provider");
    return context;
};
