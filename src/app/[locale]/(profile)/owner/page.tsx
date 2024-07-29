import style from "./owner.module.scss";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";

export default function OwnerPage() {
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
