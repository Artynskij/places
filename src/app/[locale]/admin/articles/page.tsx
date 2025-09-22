import { ArticleAdminScreen } from "@/screens/(Admin)/Article/ArticleAdmin.screen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin content`,
    };
}

const ArticleCreationPage = () => {
    return (
        <>
            <ArticleAdminScreen />
        </>
    );
};

export default ArticleCreationPage;
