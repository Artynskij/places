import Image from "next/image";
import styles from "./page.module.scss";
import { redirect } from "next/navigation";
import { MainScreen } from "@/screens/MainScreen/MainScreen";
import { IPageProps } from "@/types/IType";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  return {
    title: `${process.env.BASE_NAME}`,
  };
}
interface IProps extends IPageProps {
  params: IPageProps["params"];
}
export default function Home({ params, searchParams }: IProps) {
  // redirect('/countries')
  return <MainScreen params={params} searchParams={searchParams} />;
}
