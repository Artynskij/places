
import { IPageProps } from "@/models";
import UsersScreen from "@/screens/(Profile)/UserScreen/UserScreen";
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

export default function UserPage({ params, searchParams }: IProps) {
  return <UsersScreen params={params} searchParams={searchParams} />;
}
