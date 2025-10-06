export const getReadTimeForArticle = (text: string):number => {
    return +(text.split(" ").length / 130).toFixed(0);
};
