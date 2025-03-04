"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useState } from "react";

import { SwitcherProfileContent } from "../../../_component/Switcher/Switcher";
import {
  switcherTabTouristData,
  switcherTabUserData,
} from "@/asset/mockData/switcherTabsPage";
import TabReview from "@/screens/(Profile)/_component/Tabs/TabReview/TabReview";
import TabTravelMap from "@/screens/(Profile)/_component/Tabs/TabTravelMap/TabTravelMap";
import TabVideo from "@/screens/(Profile)/_component/Tabs/TabVideo/TabVideo";
import TabPhoto from "@/screens/(Profile)/_component/Tabs/TabPhoto/TabPhoto";
import TabPublication from "@/screens/(Profile)/_component/Tabs/TabPublication/TabPublication";

export const ContentComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const [activeTab, setActiveTab] = useState<string | null>(
  //   searchParams.get("tab")
  // );
  // useEffect(() => {
  //   setActiveTab(searchParams.get("tab"));
  //   if (!activeTab) {
  //     router.push(`${pathname}?tab=${switcherTabUserData[0].value}`);
  //     setActiveTab(switcherTabUserData[0].value);
  //   }
  // }, [searchParams]);
  return (
    <>
      <div className={style.switcher}>
        <SwitcherProfileContent
          // activeTab={activeTab}
          // setActiveTab={setActiveTab}
          data={switcherTabTouristData}
        />
      </div>
      <div className={style.switcher_content}>
        {searchParams.get("tab") === "publications" ? (
          <TabPublication></TabPublication>
        ) : searchParams.get("tab") === "photos" ? (
          <TabPhoto></TabPhoto>
        ) : searchParams.get("tab") === "videos" ? (
          <TabVideo></TabVideo>
        ) : searchParams.get("tab") === "reviews" ? (
          <TabReview></TabReview>
        ) : (
          <TabTravelMap></TabTravelMap>
        )}
      </div>
    </>
  );
};
