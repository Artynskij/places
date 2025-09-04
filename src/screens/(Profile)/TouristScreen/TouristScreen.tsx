"use client";
import style from "./touristScreen.module.scss";

import { IBasePageProps } from "@/lib/models";
import UserComponent from "./_components/UserComponent";
import ContentComponent from "./_components/ContentComponent";

import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {
        username: string;
    };
}
export default function TouristScreen({ params, searchParams }: IProps) {
    return (
        <AuthGuard roles={["tourist"]}>
            <div className="container">
                <section className={style.user}>
                    <UserComponent />
                </section>
                <section className={style.content}>
                    <ContentComponent />
                </section>
            </div>
        </AuthGuard>
    );
}
