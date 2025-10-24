export const CONSTANT_TABS = {
    owner: {
        establishments: "establishments",
        business: "business",
    },
    tourist: {
        establishments: "establishments",
        favorites: "favorites",
        travelMap: "travelMap",
        reviews: "reviews",
        publication: "publication",
        photos: "photos",
        videos: "videos",
    },
    business: {
        marketing: "marketing",
        history: "history",
        stat: "stat",
        wallet: "wallet",
        employees: "employees",
    },
    businessCreate: {
        individual: "individual",
        sole_proprietor: "sole_proprietor",
        legal_entity: "legal_entity",
    },
    settings: {
        personal: "personal",
        notification: "notification",
    },
    finder: {
        all: "all",
        TO_READ: "TO_READ",
        TO_GO: "TO_GO",
        TO_VISIT: "TO_VISIT",
        TO_SLEEP: "TO_SLEEP",
        TO_EAT: "TO_EAT",
    },
};
export const SWITCHER_OWNER = [
    { id: 1, label: "мои обьекты", value: CONSTANT_TABS.owner.establishments },
    // { id: 2, name: "продвижение", value: "marketing" },
    // { id: 3, name: "история заказов", value: "history" },
    // { id: 4, name: "статистика", value: "stat" },
    // { id: 5, name: "кошелёк", value: "wallet" },
    { id: 6, label: "бизнесы", value: CONSTANT_TABS.owner.business },
];

// export const switcherTabUserData = [
//     { id: 1, name: "мои поездки", value: "trip" },
//     { id: 2, name: "мои оценки", value: "review" },
//     { id: 3, name: "мои интересы", value: "interest" },
//     { id: 4, name: "карта путешествий", value: "travelMap" },
// ];

export const SWITCHER_TOURIST = [
    // { id: 1, name: "Публикации", value: "publications" },
    // { id: 2, name: "Фото", value: "photos" },
    // { id: 3, name: "Видео", value: "videos" },
    { id: 4, label: "избранное", value: CONSTANT_TABS.tourist.favorites },
    { id: 4, label: "Отзывы / оценки", value: CONSTANT_TABS.tourist.reviews },
    {
        id: 5,
        label: "Добавленные объекты",
        value: CONSTANT_TABS.tourist.establishments,
    },
    {
        id: 6,
        label: "Карта путешествий",
        value: CONSTANT_TABS.tourist.travelMap,
    },
];
export const SWITCHER_BUSINESS = [
    { id: 2, label: "продвижение", value: CONSTANT_TABS.business.marketing },
    { id: 3, label: "история заказов", value: CONSTANT_TABS.business.history },
    { id: 4, label: "статистика", value: CONSTANT_TABS.business.stat },
    { id: 5, label: "кошелёк", value: CONSTANT_TABS.business.wallet },
    { id: 6, label: "сотрудники", value: CONSTANT_TABS.business.employees },
];
export const SWITCHER_FINER_MAIN_PAGE = [
    {
        title: "Искать всё",
        value: CONSTANT_TABS.finder.all,
        active: true,
        placeHolder: "Что вы ищите",
    },
    {
        title: "Где поесть",
        value: CONSTANT_TABS.finder.TO_EAT,
        active: false,
        placeHolder: "Название ресторана",
    },
    {
        title: "Где поспать",
        value: CONSTANT_TABS.finder.TO_SLEEP,
        active: false,
        placeHolder: "Название отеля",
    },
    {
        title: "Что посмотреть",
        value: CONSTANT_TABS.finder.TO_VISIT,
        active: false,
        placeHolder: "Название достопримечательности",
    },
    {
        title: "Куда поехать",
        value: CONSTANT_TABS.finder.TO_GO,
        active: false,
        placeHolder: "Название страны, города, области, штата или провинции",
    },
    {
        title: "Что почитать",
        value: CONSTANT_TABS.finder.TO_READ,
        active: false,
        placeHolder: "Название статьи или что-то из нее",
    },
];
export const SWITCHER_SETTINGS_OWNER = [
    {
        id: 1,
        name: "Персональные данные",
        value: CONSTANT_TABS.settings.personal,
    },
];
export const SWITCHER_SETTINGS_TOURIST = [
    {
        id: 1,
        name: "Персональные данные",
        value: CONSTANT_TABS.settings.personal,
    },
    {
        id: 2,
        name: "Уведомления и отбражение",
        value: CONSTANT_TABS.settings.notification,
    },
];
export const SWITCHER_BUSINESS_TYPE = [
    {
        id: 1,
        name: "Физическое лицо",
        value: CONSTANT_TABS.businessCreate.individual,
    },
    {
        id: 2,
        name: "Индивидуальный предприниматель",
        value: CONSTANT_TABS.businessCreate.sole_proprietor,
    },
    {
        id: 3,
        name: "Юридическое лицо",
        value: CONSTANT_TABS.businessCreate.legal_entity,
    },
];
