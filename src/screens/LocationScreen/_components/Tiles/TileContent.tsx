import { TTilesContent } from "@/lib/models/common/TTilesContent";
import TileLocations from "./TileLocations/TileLocations";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import TileMarkdown from "./TileMarkdown/TileMarkdown";

interface ITileContent {
    typeTileContent: TTilesContent;
    dataTileContent: ILocationFront[] | null;
    rootLocationPath: string;
}

const TileContent = ({
    typeTileContent,
    dataTileContent,
    rootLocationPath,
}: ITileContent) => {
    if (
        (typeTileContent === "regions" || typeTileContent === "towns") &&
        dataTileContent
    ) {
        return (
            <TileLocations
                typeTileContent={typeTileContent}
                rootLocationPath={rootLocationPath}
                locations={dataTileContent}
            />
        );
    }
    return <TileMarkdown />;
};
export default TileContent;
