import { mockObjectsCafe } from "./mockObject";

const mockMarketingPage = [
    {
        id: 1,
        label: "Страна",
        description: "Предоставляется рекламное место по стране",
        price: 25,
        type: "country",
    },
    {
        id: 2,
        label: "Область",
        description: "Предоставляется рекламное место по области",
        price: 35,
        type: "district",
    },
    {
        id: 3,
        label: "Город",
        description: "Предоставляется рекламное место по городу",
        price: 45,
        type: "town",
    },
    // {id:4, label:'Бизнес', description:'Предоставляется рекламное место', price:'55 руб.'},
];
const mockMarketingFilter = [
    {
        id: 1,
        label: "Слайдер",
        description: "Предоставляется рекламное место",
        price: 5,
        type: "Countries",
    },
    {
        id: 2,
        label: "В списке",
        description: "Предоставляется рекламное место",
        price: 15,
        type: "Countries",
    },
];

export const mockMarketing = [
    {
        id: 1,
        label: "mainTitle",
        value: "page",
        data: [...mockMarketingPage, ...mockMarketingFilter],
    },
    // {
    //   id: 2,
    //   label: "Страница фильтрации",
    //   value: "filter",
    //   data: mockMarketingFilter,
    // },
];

const mockMarketingHistoryItem = [
    {
        id: 1,
        type: "country",
        language: { label: "Казахстан", value: "kazakhstan" },
        facility: { label: "Embassy", value: "Embassy" },
        country: { label: "Казахстан", value: "kazakhstan" },
        // district: { label: "Алматинская область", value: "almatydist" },
        // town: { label: "Алматы", value: "almaty" },
        calendar: ["12.09.2023", "13.09.2023"],
        price: { allPrice: 50, priceOne: 25 },
        status: { label: "Прошла", value: "past" },
    },
    {
        id: 2,
        type: "town",
        language: { label: "Казахстан", value: "kazakhstan" },
        facility: { label: "Starbacks", value: "Starbacks" },
        country: { label: "Казахстан", value: "kazakhstan" },
        district: { label: "Алматинская область", value: "almatydist" },
        town: { label: "Алматы", value: "almaty" },
        calendar: ["12.09.2027", "13.09.2028"],
        price: { allPrice: 90, priceOne: 45 },
        status: { label: "Будет", value: "future" },
    },
    {
        id: 3,
        type: "district",
        language: { label: "Казахстан", value: "kazakhstan" },
        facility: { label: "Rose Gose", value: "Rose Gose" },
        country: { label: "Казахстан", value: "kazakhstan" },
        district: { label: "Алматинская область", value: "almatydist" },
        // town: { label: "Алматы", value: "almaty" },
        calendar: ["12.05.2024", "13.11.2025"],
        price: { allPrice: 5500, priceOne: 35 },
        status: { label: "Идет", value: "present" },
    },
    {
        id: 4,
        type: "district",
        language: { label: "Казахстан", value: "kazakhstan" },
        facility: { label: "Rose Gose", value: "Rose Gose" },
        country: { label: "Казахстан", value: "kazakhstan" },
        district: { label: "Алматинская область", value: "almatydist" },
        // town: { label: "Алматы", value: "almaty" },
        calendar: ["12.05.2024", "13.11.2025"],
        price: { allPrice: 5500, priceOne: 35 },
        status: { label: "В обработке", value: "pending" },
    },
];

export const mockMarketingHistory = {
    rows: 3,
    price: 5640,
    data: mockMarketingHistoryItem,
};

const mockTownsForSelect = [
    { id: 1, label: "Алматы", value: "almaty" },
    { id: 2, label: "Астана", value: "astana" },
    { id: 3, label: "Шимкент", value: "shimkent" },
    { id: 4, label: "Атырау", value: "atyray" },
];
const mockCountriesForSelect = [
    { id: 1, label: "Казахстан", value: "kazakhstan" },
    { id: 2, label: "Беларусь", value: "belarus" },
    { id: 3, label: "Россия", value: "russia" },
    { id: 4, label: "Грузия", value: "georgia" },
];
const mockDistrictForSelect = [
    { id: 1, label: "Алматинская область", value: "almatydist" },
    { id: 2, label: "Акмолинская область", value: "astanadist" },
    { id: 3, label: "Туркенстанская область", value: "turkestan" },
    { id: 4, label: "Атырауская область", value: "atyraydist" },
];
const mockLanguageForSelect = [
    { id: 1, label: "Немецкий", value: "de" },
    { id: 2, label: "Русский", value: "ru" },
    { id: 3, label: "Английский", value: "en" },
];
const mockFacilityForSelect = mockObjectsCafe.map((item) => ({
    id: item.id,
    label: item.title,
    value: item.title,
}));

export const mockSelectSquare = {
    mockCountriesForSelect: mockCountriesForSelect,
    mockDistrictForSelect: mockDistrictForSelect,
    mockTownsForSelect: mockTownsForSelect,
    mockFacilityForSelect: mockFacilityForSelect,
    mockLanguageForSelect: mockLanguageForSelect,
};
