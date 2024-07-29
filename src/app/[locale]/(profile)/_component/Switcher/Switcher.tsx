import style from "./switcher.module.scss";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";

import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { ISelectOption } from "@/types/IType";
import { useTranslations } from "next-intl";

interface ISwitcherProfileContentProps {
  data: ISelectOption[];
  activeTab: string | null;
  setActiveTab: (value: string | null) => void;
}

export const SwitcherProfileContent: FC<ISwitcherProfileContentProps> = ({
  data,
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("ProfilePage.switcher");
  useEffect(() => {
    setActiveTab(searchParams.get("tab"));
    if (!activeTab) {
      router.push(`${pathname}?tab=${data[0].value}`, { scroll: false });
      setActiveTab(data[0].value);
    }
  }, [searchParams]);

  const handleChangeSwitch = (option: ISelectOption) => {
    router.push(`${pathname}?tab=${option.value}`, { scroll: false });
  };

  return (
    <>
      <div className={style.switcher}>
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${pathname}?tab=${item.value}`}
              // onClick={() => {
              //   handleChangeSwitch(item);
              // }}
              className={
                style.switcher_item +
                (activeTab === item.value ? " " + `${style.active}` : "")
              }
            >
              {t(`${item.value}`)}
            </Link>
          );
        })}
      </div>
      <div className={style.switcher__mob}>
        <SelectCustom
          options={data}
          activeOption={activeTab}
          onChange={handleChangeSwitch}
        />
      </div>
    </>
  );
};
