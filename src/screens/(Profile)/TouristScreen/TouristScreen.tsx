import style from "./touristScreen.module.scss";

import { IPageProps } from "@/lib/models";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";
import { mockTourist } from "@/asset/mockData/mockTourist";
import { notFound } from "next/navigation";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        id: string;
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
