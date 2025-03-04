"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { switcherTabOwnerData } from "@/asset/mockData/switcherTabsPage";
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

  return (
    <>
      <div className={style.switcher}>
        <SwitcherProfileContent data={switcherTabOwnerData} />
      </div>

      <div className={style.switcher_content}>
        {searchParams.get("tab") === "object" ? (
          <TabObjectsOwner></TabObjectsOwner>
        ) : searchParams.get("tab") === "marketing" ? (
          <TabMarketingOwner></TabMarketingOwner>
        ) : searchParams.get("tab") === "history" ? (
          <TabHistoryOwner></TabHistoryOwner>
        ) : searchParams.get("tab") === "stat" ? (
          <TabStatOwner></TabStatOwner>
        ) : (
          <TabWalletOwner></TabWalletOwner>
        )}
      </div>
    </>
  );
};
