import ArticleAdminScreen from "@/screens/(Admin)/Article";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | admin content`,
    };
}

const ArticleAdminPage = () => {
    return (
        <>
            <ArticleAdminScreen />
        </>
    );
};

export default ArticleAdminPage;
