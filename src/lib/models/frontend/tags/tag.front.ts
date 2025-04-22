export interface ITagFront {
    id: number | string;
    key: string;
    value: string;
    secondaryValue: string | null;
    iconName: string | null;
    count?: number | null;
}
