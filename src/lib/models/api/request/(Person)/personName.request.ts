export interface IPersonNameUpdateRequest {
    FirstName?: string | null;
    MiddleName?: string | null;
    LastName?: string | null;
    OriginalName?: string | null;
    OriginalMiddleName?: string | null;
    OriginalLastName?: string | null;
}
export interface IPersonNameCreateRequest {
    source: {
        FirstName?: string | null;
        MiddleName?: string | null;
        LastName?: string | null;
        OriginalName?: string | null;
        OriginalMiddleName?: string | null;
        OriginalLastName?: string | null;
    };
}
