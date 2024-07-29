"use client";
import Select from "antd/lib/select";
import { IconGlobe } from "../../Icons/";
import style from "./selectLang.module.scss";
import { useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales } from "@/config";
// import { useRouter } from "next/router";

export const SelectLang = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const defaultLocale = useLocale();
 
  const handleChange = (value: string) => {
    const nextLocale = value;
    console.log(searchParams.getAll("tab"));
    const newURL = pathname.split("/");
    newURL[1] = nextLocale;
    startTransition(() => {
      router.replace(newURL.join("/"));
    });

    
  };
  useEffect(() => {
   
  }, []);
  return (
    <div className={style.select_ctn}>
      <div className={style.icon_ctn}>
        <IconGlobe className={style.icon_ctn_icon} />
      </div>

      <Select
        defaultValue={defaultLocale}
        onChange={handleChange}
        style={{ height: "100%" }}
        className={style.select}
        options={
          locales.map((cur) => {
            return { value: cur, label: cur };
          })
          //   [
          //   { value: "ru", label: "Ru" },
          //   { value: "en", label: "En" },

          //   { value: "de", label: "De" },
          //   { value: "ch", label: "Ch", disabled: true },
          // ]
        }
      />
    </div>
  );
};

// "use client";

// import { ChangeEvent } from "react";

// import { IconGlobe } from "../../Icons/IconGlobe/GlobeIcon";
// export function SelectLang() {
//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const newLocale = e.target.value;

//     // set cookie for next-i18n-router
//     const days = 30;
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;
//   };

//   return (
//     <div className={style.select_ctn}>
//       <div className={style.select + ' ' + style.select_active}>
//         <IconGlobe className={style.select_ctn_icon} />
//         <div>English</div>
//       </div>
//       <div className={style.options}>
//         <div className={style.options_item}>Russian</div>
//         <div className={style.options_item}>English</div>
//       </div>
//       {/* <select onChange={handleChange}>
//         <option value="en">English</option>
//         <option value="ru">Русский</option>
//       </select> */}
//     </div>
//   );
// }
