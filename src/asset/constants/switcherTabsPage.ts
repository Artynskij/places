export const CONSTANT_TABS = {
    owner: {
        object: "object",
        business: "business",
    },
    tourist: {
        object: "object",
        travelMap: "travelMap",
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
};
export const switcherTabOwnerData = [
    { id: 1, name: "мои обьекты", value: CONSTANT_TABS.owner.object },
    // { id: 2, name: "продвижение", value: "marketing" },
    // { id: 3, name: "история заказов", value: "history" },
    // { id: 4, name: "статистика", value: "stat" },
    // { id: 5, name: "кошелёк", value: "wallet" },
    { id: 6, name: "бизнесы", value: CONSTANT_TABS.owner.business },
];

export const switcherTabUserData = [
    { id: 1, name: "мои поездки", value: "trip" },
    { id: 2, name: "мои оценки", value: "review" },
    { id: 3, name: "мои интересы", value: "interest" },
    { id: 4, name: "карта путешествий", value: "travelMap" },
];

export const switcherTabTouristData = [
    // { id: 1, name: "Публикации", value: "publications" },
    // { id: 2, name: "Фото", value: "photos" },
    // { id: 3, name: "Видео", value: "videos" },
    // { id: 4, name: "Отзывы / оценки", value: "reviews" },
    { id: 5, name: "Добавленные объекты", value: CONSTANT_TABS.tourist.object },
    {
        id: 6,
        name: "Карта путешествий",
        value: CONSTANT_TABS.tourist.travelMap,
    },
];
export const switcherTabBusinessData = [
    { id: 2, name: "продвижение", value: CONSTANT_TABS.business.marketing },
    { id: 3, name: "история заказов", value: CONSTANT_TABS.business.history },
    { id: 4, name: "статистика", value: CONSTANT_TABS.business.stat },
    { id: 5, name: "кошелёк", value: CONSTANT_TABS.business.wallet },
    { id: 6, name: "сотрудники", value: CONSTANT_TABS.business.employees },
];
export const switcherFinderMainPage = [
    {
        title: "Искать всё",
        value: "all",
        active: true,
        placeHolder: "Что вы ищите",
    },
    {
        title: "Где поесть",
        value: "TO_EAT",
        active: false,
        placeHolder: "Название ресторана",
    },
    {
        title: "Где поспать",
        value: "TO_SLEEP",
        active: false,
        placeHolder: "Название отеля",
    },
    {
        title: "Что посмотреть",
        value: "TO_VISIT",
        active: false,
        placeHolder: "Название достопримечательности",
    },
    {
        title: "Куда поехать",
        value: "TO_GO",
        active: false,
        placeHolder: "Название страны, города, области, штата или провинции",
    },
    {
        title: "Что почитать",
        value: "TO_READ",
        active: false,
        placeHolder: "Название статьи или что-то из нее",
    },
];
export const switcherSettingsOwner = [
    { id: 1, name: "Персональные данные", value: "personal" },
];
export const switcherSettingsTourist = [
    { id: 1, name: "Персональные данные", value: "personal" },
    { id: 2, name: "Уведомления и отбражение", value: "notification" },
];
export const switcherBusiness = [
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
