export interface IApiArticle {
    article: {
      Id: string;
    };
    content: {
      id: string;
      type: string;
      content: {
        lang: string;
        value: {
          title: string;
          slug: string;
          description: string;
          image: string;
          author: string;
          date: string;
          markdown: string;
          tags: string[];
          reactions: number[];
        };
      }[];
    };
  }