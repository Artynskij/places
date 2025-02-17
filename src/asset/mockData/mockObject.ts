import { IDataCardSlider } from "@/models/ICards";
import { number } from "yup";

export const mockObjectsHotels: IDataCardSlider[] = [
  {
    id: 1,
    title: "Новотель Алматы Сити Центр",
    location: "Алматы, Казахстан",
    rating: 4.5,
    reviews: 20,
    globalType: "hotel",
    type: "Отель",
    img: "/mock/hotel Novaotel.jpg",
    additional: "Поспи от души",
    description: "Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.242447459980205",
      lon: "76.95849398338954",
    },
    hotelClass: 4,
  },
  {
    id: 2,
    title: "Отель Риксос Алматы",
    location: "Алматы, Казахстан",
    rating: 4.2,
    reviews: 20,
    globalType: "hotel",
    type: "Отель",
    img: "/mock/hotel Ricos.jpg",

    additional: "Поспи от души",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.2494907787455",
      lon: "76.93456531038055",
    },
    hotelClass: 5,
  },
  {
    id: 3,
    title: "Ramada by Wyndham Almaty",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 20,
    globalType: "hotel",
    type: "Отель",
    img: "/mock/hotel Ramada.jpg",
    additional: "Поспи от души",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.25537143509308",
      lon: "76.92550549688542",
    },
    hotelClass: 1,
  },
  {
    id: 4,
    title: "Park Hotel Almaty",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 20,
    globalType: "hotel",
    type: "Отель",
    img: "/mock/hotel Park.jpg",

    additional: "Поспи от души",
    description: "",
    coord: {
      lat: "43.24385065553898",
      lon: "76.94906019688499",
    },
    hotelClass: 3,
  },
  {
    id: 5,
    title: "Swissôtel Wellness Resort Alatau Almaty",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 20,
    globalType: "hotel",
    type: "Отель",
    img: "/mock/hotel swiss.jpg",

    additional: "Поспи от души",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.19683139210787",
      lon: "76.81284431037844",
    },
    hotelClass: 4,
  },
  {
    id: 6,
    title: "Отель Казахстан",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 20,
    globalType: "hotel",
    type: "Hotel",
    img: "/mock/hotel Kazahstan.jpg",

    additional: "Поспи от души",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.24508797538462",
      lon: "76.95766119688501",
    },
    hotelClass: 5,
  },
];
export const mockObjectsCafe: IDataCardSlider[] = [
  {
    id: 1,
    title: "Чечил Паб",
    location: "Алматы, Казахстан",
    rating: 2,
    reviews: 5,
    globalType: "cafe",
    type: "Паб",
    additional: "Итальянская, Мексиканская, Американская",
    img: "/mock/rest Chechil pab.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.234985",
      lon: "76.889862",
    },
    costClass: 1,
  },
  {
    id: 2,
    title: "Beefeater Алматы",
    location: "Алматы, Казахстан",
    rating: 3.2,
    reviews: 20,
    globalType: "cafe",
    type: "Кофейня",
    additional: " Средиземноморская, Барбекю, Белорусская",
    img: "/mock/rest Befeater almaty.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.251591",
      lon: "76.955521",
    },
    costClass: 3,
  },
  {
    id: 3,
    title: "Nuala",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "cafe",
    type: "Кофейня",
    additional: " Средиземноморская, Барбекю, Казахская",
    img: "/mock/rest Nuala.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.252819",
      lon: "76.943039",
    },
    costClass: 3,
  },
  {
    id: 4,
    title: "Дареджани Кунаева",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "cafe",
    type: "Ресторан",
    additional: " Средиземноморская,  Американская",
    img: "/mock/rest daregjani.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.256413",
      lon: "76.950035",
    },
    costClass: 3,
  },
  {
    id: 5,
    title: "KetchUp",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "cafe",
    type: "Ресторан",
    additional: " Средиземноморская,  Европейская",
    img: "/mock/rest ketchup.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.251389",
      lon: "76.955566",
    },
    costClass: 2,
  },
  {
    id: 6,
    title: "Vista",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "cafe",
    type: "Ресторан",
    additional: "Средиземноморская, Барбекю, Азиатская",
    img: "/mock/rest vista.jpg",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.219147",
      lon: "76.929245",
    },
    costClass: 2,
  },
];
export const mockObjectsRelax: IDataCardSlider[] = [
  {
    id: 1,
    title: "Большое Алматинское озеро",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Достопримечастельность",
    img: "/mock/active Big lake.jpg",

    additional: "Водоемы , Культурные объекты и достопримечательности",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.05121236376045",
      lon: "76.98504261859547",
    },
  },
  {
    id: 2,
    title: "Алматинский зоопарк",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Зоопарки",
    img: "/mock/active Zoo Almaty.jpg",

    additional: "Зоопарки",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.263700276271024",
      lon: "76.97653622475764",
    },
  },
  {
    id: 3,
    title: "Arba Wine",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Еда и напитки",
    img: "/mock/active Arba.jpg",

    additional: "Винодельни и виноградники",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.259976303752936",
      lon: "76.94076082756466",
    },
  },
  {
    id: 4,
    title: "Kok-Tobe Hill",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Горы",
    img: "/mock/active Kok tobe.jpg",

    additional: "горы, обзорные площадки, парки",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.234316147838854",
      lon: "76.97593169450407",
    },
  },
  {
    id: 5,
    title: "Dostyk Plaza",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Торговые центры",
    img: "/mock/active Dostyk Plaza.jpg",

    additional: "Торговые центры",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.233573055031776",
      lon: "76.95677668154504",
    },
  },
  {
    id: 6,
    title:
      "Казахский Государственный академический театр оперы и балета имени Абая",
    location: "Алматы, Казахстан",
    rating: 5,
    reviews: 50,
    globalType: "relax",
    type: "Концерты и представления",
    img: "/mock/active Teatr.jpg",

    additional: "Балет, Опера",
    description:
      "Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. Тут круто. ОЧень круто. ",
    coord: {
      lat: "43.24909215338268",
      lon: "76.94580081038052",
    },
  },
];
export const mockObjectsAll: IDataCardSlider[] = [
  ...mockObjectsHotels,
  ...mockObjectsCafe,
  ...mockObjectsRelax,
];

export const mockObjectForObjectPage = {
  title: "Таверна Ереван",
  category: "Кафе",
  register: true,
  img: [
    "/mock/mockObjErevan-2.jpg",
    "/mock/mockObjErevan-3.jpg",
    "/mock/mockObjErevan-4.jpg",
    "/mock/mockObjErevan-5.jpg",
    "/mock/mockObjErevan-6.jpg",
    "/mock/mockObjErevan-7.jpg",
    "/mock/mockObjErevan-1.jpg",
    "/mock/active Arba.jpg",
    "/mock/active Big lake.jpg",
    "/mock/active Dostyk Plaza.jpg",
    "/mock/active Kok tobe.jpg",
    "/mock/active Teatr.jpg",
    "/mock/active Zoo Almaty.jpg",
    "/mock/akmolindistrict.jpg",
    "/mock/almaty.jpg",
    "/mock/almatydistrict.jpeg",
    "/mock/astana.jpg",
    "/mock/atyray.jpg",
    "/mock/atyraydistrict.jpg",
    "/mock/avatarOwnerMock.jpg",
    "/mock/avatarUserMock.png",
    "/mock/cafeMock.jpg",
    "/mock/hotel Kazahstan.jpg",
    "/mock/hotel Novaotel.jpg",
    "/mock/hotel Park.jpg",
    "/mock/mockObjErevan-map.jpg",
    "/mock/profileBackgroundMock.jpg",
    "/mock/rest Befeater almaty.jpg",
    "/mock/rest Chechil pab.jpg",
    "/mock/rest daregjani.jpg",
    "/mock/rest ketchup.jpg",
    "/mock/rest Nuala.jpg",
    "/mock/rest vista.jpg",
    "/mock/restMock.jpg",
    "/mock/shymkent.jpg",
    "/mock/turkestandistrict.jpg",
  ],
  rating: {
    main: 4,
    reviews: 4339,
    addition: [
      { key: "nutrition", title: "Питание", value: 4.8 },
      { key: "service", title: "Обслуживание", value: 4.8 },
      { key: "priceAndQuality", title: "Цена/Качество", value: 4.8 },
      { key: "atmosphere", title: "Атмосфера", value: 4.8 },
    ],
  },

  coord: {
    lat: "43.05121236376045",
    lon: "76.98504261859547",
  },
  location: {
    country: "Армения",
    district: "Марза",
    town: "Ереван",
    address: "Ул. Теряна, 91, Ереван 0009 Армения",
  },
  contacts: {
    phoneNumber: "+374 96 508800",
    mail: "info@yeremyanprojects.com",
    website: "https://www.yeremyanprojects.com/en/restaurants/tavern-yerevan",
    menu: "https://www.yeremyanprojects.com/en/restaurants/tavern-yerevan",
    telegram: { value: "artyn_artem" },
    viber: { value: "+375291747494" },
    whatsapp: { value: "+375291747494" },
    instagram: { value: "aartynskij" },
  },
  info: {
    priceRating: { title: "средний", count: 2 },
    price: "723,00 ₽ – 1 962,00 ₽",
    description:
      "Ресторан «Лаваш» — символ культуры, красок и армянского гостеприимства. «Лаваш» предлагает своим гостям традиционные армянские, популярные и известные региональные блюда, а также регулярно обновляемое и разнообразное меню.",
  },
  query: [
    { key: "typeKitchen", title: "Тип кухни", value: "Здоровая, Армянская" },
    {
      key: "specMenu",
      title: "Специализированное меню",
      value: "Подходит вегетарианцам, Веганская кухня",
    },
    {
      key: "timeEat",
      title: "Время приема пищи",
      value: "Завтрак, Обед, Ужин, Бранч, Напитки",
    },
    {
      key: "service",
      title: "УСЛУГИ",
      value:
        "Еда на вынос, Бронирование, Столики на открытом воздухе, Места для сидения, Детские стульчики для кормления, Подают алкоголь, Бар, Принимаются карты Mastercard, Принимаются карты Visa, Бесплатный Wi-Fi, Принимаются кредитные карты, Обслуживание посетителей за столиками, Подарочные карты",
    },
  ],
  queryForModal: [
    { title: "Шляпа 1", value: "Some1", key: "Simka" },
    { title: "Шляпа 2", value: "Some2", key: "Samka" },
  ],
  schedule: [
    { day: "Пн", shedule: "11:00 – 22:00" },
    { day: "Вт", shedule: "11:00 – 22:00" },
    { day: "Ср", shedule: "11:00 – 22:00" },
    { day: "Чт", shedule: "11:00 – 22:00" },
    { day: "Пт", shedule: "11:00 – 22:00" },
    { day: "Сб", shedule: "11:00 – 22:00" },
    { day: "Вс", shedule: "11:00 – 22:00" },
  ],
};
