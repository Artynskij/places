import style from "./user.module.scss";
import { UserComponent } from "./_components/UserComponent/UserComponent";
import { ContentComponent } from "./_components/ContentComponent/ContentComponent";

export default function UserPage() {
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
