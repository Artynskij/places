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
Some fix:
1. Cabinet switcher


Before deploy:
1. Почистить код на импорты 
2. Можно объединить стили новостных скринов