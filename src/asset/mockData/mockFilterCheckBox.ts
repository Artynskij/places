const mockFilterCheckBoxHotelType = [
  {
    id: 1,
    name: "Отель",
    value: "Hotel",
  },
  {
    id: 2,
    name: "Жилье особого типа",
    value: "SpecialTypeOfHousing",
  },
  {
    id: 3,
    name: "Квартиры/Кондо",
    value: "Flat",
  },
  {
    id: 4,
    name: "Хостел",
    value: "Hostel",
  },
  {
    id: 5,
    name: "Кемпинг",
    value: "Camping",
  },
  {
    id: 6,
    name: "Пансионат",
    value: "BoardingHouses",
  },
  {
    id: 7,
    name: "Вилла",
    value: "Villa",
  },
  {
    id: 8,
    name: "Коттедж",
    value: "Cottages",
  },
  {
    id: 9,
    name: "Ранчо",
    value: "Ranch",
  },
  {
    id: 10,
    name: "Сельский дом",
    value: "RuralHouses",
  },
  {
    id: 11,
    name: "Мотель",
    value: "Motel",
  },
];
const mockFilterCheckBoxHotelServices = [
  {
    id: 1,
    name: "Беспалтный вай фай",
    value: "freeWiFi",
  },
  {
    id: 2,
    name: "Завтрак включен",
    value: "breakfast",
  },
  {
    id: 3,
    name: "Бассейн",
    value: "pool",
  },
  {
    id: 4,
    name: "Бесплатная парковка",
    value: "parking",
  },
  {
    id: 5,
    name: "Ресторан",
    value: "restaurant",
  },
  {
    id: 6,
    name: "Животные разрешены",
    value: "animalCan",
  },
  {
    id: 7,
    name: "СПА",
    value: "SPA",
  },
  //   {
  //     id: 8,
  //     name: "Коттеджы",
  //     value:'Cottages'
  //   },
  //   {
  //     id: 8,
  //     name: "Ранчо",
  //     value:'Ranch'
  //   },
  //   {
  //     id: 9,
  //     name: "Сельские дома",
  //     value:'RuralHouses'
  //   },
  //   {
  //     id: 10,
  //     name: "Мотели",
  //     value:'Motel'
  //   },
];
const mockFilterCheckBoxHotelStyle = [
  {
    id: 1,
    name: "Бюджетный",
    value: "Budget",
  },
  {
    id: 2,
    name: "По умеренной цене",
    value: "reasonableprice",
  },
  {
    id: 3,
    name: "Элитный",
    value: "elite",
  },
  {
    id: 4,
    name: "Для всей семьи",
    value: "allfamily",
  },
  {
    id: 5,
    name: "Для бизнеса",
    value: "forbusiness",
  },
  {
    id: 6,
    name: "Романтический",
    value: "romantic",
  },
  {
    id: 7,
    name: "Современный",
    value: "modern",
  },
]
const mockFilterCheckBoxHotelClass = [
  {
    id: 1,
    name: "5 звезд",
    value: "fivestar",
  },
  {
    id: 2,
    name: "4 звезды",
    value: "fourstar",
  },
  {
    id: 3,
    name: "3 звезды",
    value: "threestar",
  },
  {
    id: 4,
    name: "2 звезды",
    value: "twostar",
  },
  {
    id: 5,
    name: "1 звеза",
    value: "onestar",
  },
]
export const mockFilterHotel = [
  { title: "Тип отеля", value: "type", data: mockFilterCheckBoxHotelType },
  { title: "Сервисы", value: "service", data: mockFilterCheckBoxHotelServices },
  { title: "Стиль", value: "style", data: mockFilterCheckBoxHotelStyle },
  { title: "Класс отеля", value: "star", data: mockFilterCheckBoxHotelClass },
];

export interface IMockFilter {
  id: number;
  name: string;
  value: string;
}

export interface IMockBlock {
  title: string;
  value: string;
  data: IMockFilter[];
}
