"use client";
import { useScreenSizeListener } from "@/asset/hooks/useScreenSizeListener";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children?: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  useScreenSizeListener();
  return <div>{children}</div>;
};

export default ClientOnly;
