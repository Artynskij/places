export interface IContactEstablishmentRequest {
    source: {
        Phone: string | null;
        Web: string | null;
        Email: string | null;
        Menu: string | null;
        SocialContactsId: string | null;
    };
    // content: {
    //     lang: string;
    //     value: {
    //         addressLine: string;
    //     };
    // };
}
