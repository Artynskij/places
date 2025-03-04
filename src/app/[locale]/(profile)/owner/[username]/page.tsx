import { IPageProps } from "@/models";
import OwnerScreen from "@/screens/(Profile)/OwnerScreen/OwnerScreen";
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${process.env.BASE_NAME} | ${params.username}`,
  };
}

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    username: string;
  };
}

export default function OwnerPage({ params, searchParams }: IProps) {
  return <OwnerScreen params={params} searchParams={searchParams}/>;
}
