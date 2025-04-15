Need fix:
1. AlbumComponent - img
    Вариант с прогрузкой изображений и так же но в дальнейшем подкинуть их в тег Image.
2. Доп библиотеки для markdown 
    next.config
    const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        // Вы можете подключить плагины Remark и Rehype
        remarkPlugins: [],
        rehypePlugins: [],
    },
    });
старые  "@types/mdx": "^2.0.13", "@mdx-js/loader": "^3.1.0", "@mdx-js/react": "^3.1.0", "@next/mdx": "^15.0.3",
3. что-то с подгрузкой антд стилей. либо лоадер накинуть либо скелет


##Some fix:
1. Cabinet switcher
2. finder на главной и в шапке при множестве находок
3. слайдеры. Вроде можно объеденить. Разница в settings и skeleton
4. scss добавить mixins или дефолтные стили для оптимизации
5. Плитки адаптировать для полученных данных с сервера
6. baseUrl для share est


##Before deploy:
1. Почистить код на импорты 
2. Можно объединить стили новостных скринов
3. _components сделать иморты export default

##Админка:
1. https://adminlte.io/






