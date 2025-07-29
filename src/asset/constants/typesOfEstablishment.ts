export const CONSTANT_TYPES_OF_ESTABLISHMENT = {
    ATTRACTION: {
        key: "ATTRACTION",
        title: "Развлечение",
        secondValue: "Что посмотреть",
        id: process.env.NEXT_PUBLIC_ID_DB_ATTRACTION as string,
    },
    EATER: {
        key: "EATER",
        title: "Еда",
        secondValue: "Где поесть",
        id: process.env.NEXT_PUBLIC_ID_DB_EATER as string,
    },
    ACCOMMODATION: {
        key: "ACCOMMODATION",
        title: "Размещение",
        secondValue: "Где остановиться",
        id: process.env.NEXT_PUBLIC_ID_DB_ACCOMMODATION as string,
    },
};
