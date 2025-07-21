import style from "./touristScreen.module.scss";

import { IPageProps } from "@/lib/models";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";
import { mockTourist } from "@/asset/mockData/mockTourist";
import { notFound } from "next/navigation";
import { useUser } from "@/lib/context/UserContext/UserContext";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        id: string;
    };
}
export default function TouristScreen({ params, searchParams }: IProps) {
    const dataUser = mockTourist.find((item) => item.username === params.id);

    if (!dataUser) notFound();
    return (
        <div className="container">
            <section className={style.user}>
                <UserComponent />
            </section>
            <section className={style.content}>
                <ContentComponent dataUser={dataUser} />
            </section>
        </div>
    );
}
