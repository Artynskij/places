"use client";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";
import ContentComponent from "./_components/ContentComponent";
import UserComponent from "./_components/UserComponent";
import style from "./ownerScreen.module.scss";

import { IBasePageProps } from "@/lib/models";
interface IProps
    extends IBasePageProps<{
        username: string;
    }> {}

export default function OwnerScreen({ params, searchParams }: IProps) {
    return (
        <AuthGuard roles={["owner"]}>
            <div className="container">
                <div className={style.user}>
                    <UserComponent />
                </div>
                <div className={style.content}>
                    <ContentComponent />
                </div>
            </div>
        </AuthGuard>
    );
}
