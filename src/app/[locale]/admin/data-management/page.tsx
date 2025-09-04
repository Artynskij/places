import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";

import { DataManagerScreen } from "@/screens/(Admin)/DataManager/DataManager.screen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin`,
    };
}

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
}

export default function DataManagerPage({ params, searchParams }: IProps) {
    return (
        <>
            <DataManagerScreen />
        </>
    );
}
