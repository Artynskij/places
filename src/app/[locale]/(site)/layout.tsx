import { ReactNode } from "react";

import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";

export default async function SiteLayout({
    children,
    params: { locale },
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    return (
        <>
            {/* <Header /> */}
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}
