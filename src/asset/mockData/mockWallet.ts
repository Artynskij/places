export const mockCurrency = [
  { id: 1, currency: { name: "российский рубль", value: "rub" }, count: 200 },
  { id: 2, currency: { name: "доллар", value: "usd" }, count: 200 },
  { id: 3, currency: { name: "казахский тенге", value: "kzt" }, count: 200 },
];

export const mockWalletHistory = [
  {
    id: 1,
    title: "Пополнение счета",
    count: 200,
    date: "01.08.2023, 16:34",
    status: { value: "pending", name: "В обработке" },
  },
  {
    id: 2,
    title: "Пополнение счета",
    count: 500,
    date: "01.09.2023, 16:34",
    status: { value: "error", name: "Ошибка" },
  },
  {
    id: 3,
    title: "Пополнение счета",
    count: 300,
    date: "03.09.2023, 16:34",
    status: { value: "fulfilled", name: "Обработана" },
  },
  {
    id: 4,
    title: "Пополнение счета",
    count: 400,
    date: "12.09.2023, 16:34",
    status: { value: "error", name: "Ошибка" },
  },
  {
    id: 5,
    title: "Пополнение счета",
    count: 400,
    date: "12.09.2023, 16:34",
    status: { value: "fulfilled", name: "Обработана" },
  },
  {
    id: 6,
    title: "Пополнение счета",
    count: 400,
    date: "12.09.2023, 16:34",
    status: { value: "pending", name: "В обработке" },
  },
  {
    id: 7,
    title: "Пополнение счета",
    count: 400,
    date: "12.09.2023, 16:34",
    status: { value: "fulfilled", name: "Обработана" },
  },
];
