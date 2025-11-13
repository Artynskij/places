export interface IPersonTravelMarkFront {
    id: string;
    personId: string;
    location: { id: string; title: string, path:string };
    isVisited: boolean;
    isWanted: boolean;
    isLoved: boolean;
}
