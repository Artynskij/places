"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useState } from "react";
import { switcherTabUserData } from "@/asset/mockData/data";
import { TabTripUser } from "./TabTripUser/TabTripUser";
import { TabReviewUser } from "./TabReviewUser/TabReviewUser";
import { TabInterestUser } from "./TabInterestUser/TabIterestUser";
import { TabTravelMap } from "./TabTravelMap/TabTravelMap";
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
  //     router.push(`${pathname}?tab=${switcherTabUserData[0].value}`);
  //     setActiveTab(switcherTabUserData[0].value);
  //   }
  // }, [searchParams]);
  return (
    <>
      <div className={style.switcher}>
        <SwitcherProfileContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={switcherTabUserData}
        />
      </div>
      <div className={style.switcher_content}>
        {activeTab === "trip" ? (
          <TabTripUser></TabTripUser>
        ) : activeTab === "review" ? (
          <TabReviewUser></TabReviewUser>
        ) : activeTab === "interest" ? (
          <TabInterestUser></TabInterestUser>
        ) : (
          <TabTravelMap></TabTravelMap>
        )}
      </div>
    </>
  );
};
