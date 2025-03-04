import style from "./touristScreen.module.scss";

import { IPageProps } from "@/models";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    username: string;
  };
}
export default function TouristScreen({ params, searchParams }: IProps) {
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
