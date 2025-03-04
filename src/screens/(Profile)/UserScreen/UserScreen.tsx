import style from "./userScreen.module.scss";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";
import { IPageProps } from "@/models";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    username: string;
  };
}

export default function UsersScreen({ params, searchParams }: IProps) {
  return (
    <div className="container">
      <section className={style.user}>
        <UserComponent />
      </section>
      <section className={style.content}>
        <ContentComponent />
      </section>
    </div>
  );
}
