import style from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={"container " + style.container}>
        <div className={style.footer_left}>
          <div className={style.footer_item}>О нас</div>
          <div className={style.footer_item}>Реклама</div>
        </div>
        <div className={style.footer_center}>places gold 2024</div>
        <div className={style.footer_right}>
          <div className={style.footer_item}>Политика конфиденциальности</div>
          <div className={style.footer_item}>Политика куки</div>
        </div>
      </div>
    </footer>
  );
};
