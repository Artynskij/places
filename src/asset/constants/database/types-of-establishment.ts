export const CONSTANT_TYPES_OF_ESTABLISHMENT_DB = {
    ATTRACTION: {
        key: "ATTRACTION",
        title: "Развлечение",
        secondValue: "Что посмотреть",
        info: '*сюда относятся музеи, театры, достопримечательности, парки и иное',
        id: process.env.NEXT_PUBLIC_ID_DB_ATTRACTION as string,
    },
    EATER: {
        key: "EATER",
        title: "Еда",
        secondValue: "Где поесть",
        info: '*сюда относятся рестораны, бары, пабы, кафе и иное',
        id: process.env.NEXT_PUBLIC_ID_DB_EATER as string,
    },
    ACCOMMODATION: {
        key: "ACCOMMODATION",
        title: "Размещение",
        secondValue: "Где остановиться",
        info: '*сюда относятся отели, гостиницы, квартиры, пансионаты, хостелы и иное',
        id: process.env.NEXT_PUBLIC_ID_DB_ACCOMMODATION as string,
    },
};
