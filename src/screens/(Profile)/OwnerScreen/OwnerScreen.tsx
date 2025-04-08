import style from "./ownerScreen.module.scss";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";
import { IPageProps } from "@/lib/models";
interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        username: string;
    };
}

export default function OwnerScreen({ params, searchParams }: IProps) {
    return (
        <div className="container">
            <div className={style.user}>
                <UserComponent />
            </div>
            <div className={style.content}>
                <ContentComponent />
            </div>
        </div>
    );
}
