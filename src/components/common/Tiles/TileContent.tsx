import { ILocationFront } from "@/lib/models";
import TileLocations from "./TileLocations/TileLocations";

import TileMarkdown from "./TileMarkdown/TileMarkdown";
import { TTilesContent } from "@/lib/models/types";

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
        (typeTileContent === "regions" || typeTileContent === "towns") 
    ) {
        return (
            <TileLocations
                typeTileContent={typeTileContent}
                rootLocationPath={rootLocationPath}
                // locations={dataTileContent}
            />
        );
    }
    return <TileMarkdown />;
};
export default TileContent;
