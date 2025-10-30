import { Inter } from "next/font/google";

import "./globals.scss";
import { ReactNode, Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Checkbox, ConfigProvider, Select } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { ReduxProvider } from "@/store/provider";
import { AllContextProvider } from "@/lib/context/AllContext";
import ClientOnly from "@/components/ATest/ClientOnly";
import Loading from "./loading";
import { IBasePageProps } from "@/lib/models";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";

// import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });
interface IRootLayoutProps extends IBasePageProps {
    children: React.ReactNode;
}

const theme = {
    token: {
        colorPrimary: '#005ba1',
        colorPrimaryHover: '#237fc6',
    },
    components: {
        Select: {
            activeBorderColor: 'red',
            hoverBorderColor: '#bea97c',
            controlOutline: 'transparent',
            // borderRadius: 100,

        },
        DatePicker: {
            paddingSM: 12,
        },

    },
};

export default async function RootLayout({
    children,
    params: { locale },
}: IRootLayoutProps) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <link rel="icon" href="/icons/favicon small.svg" sizes="any" />
            <body className={inter.className}>
                <ReduxProvider>
                    <AntdRegistry>
                        <ConfigProvider theme={theme}>
                            <NextIntlClientProvider messages={messages}>
                                <AllContextProvider>
                                    <ClientOnly />
                                    {/* <Suspense fallback={<Loading />}> */}
                                    <Header />
                                    {children}
                                    <Footer />
                                    {/* </Suspense> */}
                                </AllContextProvider>
                            </NextIntlClientProvider>
                        </ConfigProvider>
                    </AntdRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}
