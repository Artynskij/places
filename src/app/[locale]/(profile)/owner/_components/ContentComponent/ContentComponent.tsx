"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  switcherTabOwnerData,
  switcherTabUserData,
} from "@/asset/mockData/data";
import { TabObjectsOwner } from "./TabObjectsOwner/TabObjectsOwner";
import { TabMarketingOwner } from "./TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "./TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "./TabStatOwner/TabStatOwner";
import { TabWalletOwner } from "./TabWalletOwner/TabWalletOwner";
import { SwitcherProfileContent } from "../../../_component/Switcher/Switcher";


export const ContentComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<string | null>(
    searchParams.get("tab")
  );

  // useEffect(() => {
  //   setActiveTab(searchParams.get("tab"));
  //   if (!activeTab) {
  //     router.push(`${pathname}?tab=${switcherTabOwnerData[0].value}`);
  //     setActiveTab(switcherTabOwnerData[0].value);
  //   }
  // }, [searchParams]);
  return (
    <>
      <div className={style.switcher}>
        <SwitcherProfileContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={switcherTabOwnerData}
        />
      </div>

      <div className={style.switcher_content}>
        {activeTab === "object" ? (
          <TabObjectsOwner></TabObjectsOwner>
        ) : activeTab === "marketing" ? (
          <TabMarketingOwner></TabMarketingOwner>
        ) : activeTab === "history" ? (
          <TabHistoryOwner></TabHistoryOwner>
        ) : activeTab === "stat" ? (
          <TabStatOwner></TabStatOwner>
        ) : (
          <TabWalletOwner></TabWalletOwner>
        )}
      </div>
    </>
  );
};
