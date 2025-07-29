export interface IMapboxContext {
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
}

export interface IMapboxGeometry {
    type: string;
    coordinates: [number, number];
}

export interface IMapboxFeature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Record<string, any>;
    text: string;
    place_name: string;
    center: [number, number];
    geometry: IMapboxGeometry;
    context?: IMapboxContext[];
    address?: string;
}

export interface IMapboxGeocodeResponse {
    type: string;
    query: [number, number];
    features: IMapboxFeature[];
    attribution: string;
}
export interface IMapboxCoordPropToForm {
    lat: number;
    lon: number;
    addressFullLine: string | null;
    addressLine: string | null;
}
