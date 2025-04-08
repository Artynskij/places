"use client";

import { Button } from "@/components/UI/Button/Button";
import { FC, useState } from "react";
import { IconFollow, IconFollowing } from "../Icons";

export const SubscribeButton: FC = () => {
  const [subscribe, setSubscribe] = useState<boolean>(false);
  function handleClick() {
    setSubscribe(!subscribe);
  }
  return (
    <Button
      type="light"
      onClick={handleClick}
      icon={subscribe ? <IconFollowing /> : <IconFollow />}
      text={subscribe ? "вы подписаны" : "подписаться"}
    />
  );
};
