import style from "./test.module.scss";
// import { GoogleMaps } from "@/components/UI/Map/Map/MapGoogle";

export default function testPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <div className={style["ctn"]}>
        {/* <Button /> */}
        <p className={style["test-container"]}>Test page</p>
        <h1>Карта</h1>
        {/* <GoogleMaps /> */}
      </div>
    </>
  );
}
