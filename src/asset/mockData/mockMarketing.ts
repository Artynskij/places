import { mockObjectsCafe } from "./mockObject";

const mockMarketingPage = [
  {
    id: 1,
    name: "Страна",
    description: "Предоставляется рекламное место по стране",
    price: 25,
    type: "country",
  },
  {
    id: 2,
    name: "Область",
    description: "Предоставляется рекламное место по области",
    price: 35,
    type: "district",
  },
  {
    id: 3,
    name: "Город",
    description: "Предоставляется рекламное место по городу",
    price: 45,
    type: "town",
  },
  // {id:4, name:'Бизнес', description:'Предоставляется рекламное место', price:'55 руб.'},
];
const mockMarketingFilter = [
  {
    id: 1,
    name: "Слайдер",
    description: "Предоставляется рекламное место",
    price: 5,
    type: "Countries",
  },
  {
    id: 2,
    name: "В списке",
    description: "Предоставляется рекламное место",
    price: 15,
    type: "Countries",
  },
];

export const mockMarketing = [
  {
    id: 1,
    name: "mainTitle",
    value: "page",
    data: [...mockMarketingPage, ...mockMarketingFilter],
  },
  // {
  //   id: 2,
  //   name: "Страница фильтрации",
  //   value: "filter",
  //   data: mockMarketingFilter,
  // },
];

const mockMarketingHistoryItem = [
  {
    id: 1,
    type: "country",
    language: { name: "Казахстан", value: "kazakhstan" },
    facility: { name: "Embassy", value: "Embassy" },
    country: { name: "Казахстан", value: "kazakhstan" },
    // district: { name: "Алматинская область", value: "almatydist" },
    // town: { name: "Алматы", value: "almaty" },
    calendar: ["12.09.2023", "13.09.2023"],
    price: { allPrice: 50, priceOne: 25 },
    status: { name: "Прошла", value: "past" },
  },
  {
    id: 2,
    type: "town",
    language: { name: "Казахстан", value: "kazakhstan" },
    facility: { name: "Starbacks", value: "Starbacks" },
    country: { name: "Казахстан", value: "kazakhstan" },
    district: { name: "Алматинская область", value: "almatydist" },
    town: { name: "Алматы", value: "almaty" },
    calendar: ["12.09.2027", "13.09.2028"],
    price: { allPrice: 90, priceOne: 45 },
    status: { name: "Будет", value: "future" },
  },
  {
    id: 3,
    type: "district",
    language: { name: "Казахстан", value: "kazakhstan" },
    facility: { name: "Rose Gose", value: "Rose Gose" },
    country: { name: "Казахстан", value: "kazakhstan" },
    district: { name: "Алматинская область", value: "almatydist" },
    // town: { name: "Алматы", value: "almaty" },
    calendar: ["12.05.2024", "13.11.2025"],
    price: { allPrice: 5500, priceOne: 35 },
    status: { name: "Идет", value: "present" },
  },
  {
    id: 4,
    type: "district",
    language: { name: "Казахстан", value: "kazakhstan" },
    facility: { name: "Rose Gose", value: "Rose Gose" },
    country: { name: "Казахстан", value: "kazakhstan" },
    district: { name: "Алматинская область", value: "almatydist" },
    // town: { name: "Алматы", value: "almaty" },
    calendar: ["12.05.2024", "13.11.2025"],
    price: { allPrice: 5500, priceOne: 35 },
    status: { name: "В обработке", value: "pending" },
  },
];

export const mockMarketingHistory = {
  rows: 3,
  price: 5640,
  data: mockMarketingHistoryItem,
};

const mockTownsForSelect = [
  { id: 1, name: "Алматы", value: "almaty" },
  { id: 2, name: "Астана", value: "astana" },
  { id: 3, name: "Шимкент", value: "shimkent" },
  { id: 4, name: "Атырау", value: "atyray" },
];
const mockCountriesForSelect = [
  { id: 1, name: "Казахстан", value: "kazakhstan" },
  { id: 2, name: "Беларусь", value: "belarus" },
  { id: 3, name: "Россия", value: "russia" },
  { id: 4, name: "Грузия", value: "georgia" },
];
const mockDistrictForSelect = [
  { id: 1, name: "Алматинская область", value: "almatydist" },
  { id: 2, name: "Акмолинская область", value: "astanadist" },
  { id: 3, name: "Туркенстанская область", value: "turkestan" },
  { id: 4, name: "Атырауская область", value: "atyraydist" },
];
const mockLanguageForSelect = [
  { id: 1, name: "Немецкий", value: "de" },
  { id: 2, name: "Русский", value: "ru" },
  { id: 3, name: "Английский", value: "en" },
];
const mockFacilityForSelect = mockObjectsCafe.map((item) => ({
  id: item.id,
  name: item.title,
  value: item.title,
}));

export const mockSelectSquare = {
  mockCountriesForSelect: mockCountriesForSelect,
  mockDistrictForSelect: mockDistrictForSelect,
  mockTownsForSelect: mockTownsForSelect,
  mockFacilityForSelect: mockFacilityForSelect,
  mockLanguageForSelect: mockLanguageForSelect,
};
