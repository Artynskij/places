import {
    IArticleEntityWithContent,
    IEstablishmentWithContentPareEntity,
    IFavoriteEntity,
    IFavoriteFront,
} from "@/lib/models";

import { EstablishmentMapper } from "../(Establishment)/establishment/establishment.mapper";
import { PersonMapper } from "../(Person)/person/person.mapper";
import ArticleMapper from "../(Article)/article/article.mapper";

export class FavoriteMapper {
    private personMapper: PersonMapper;
    private establishmentMapper: EstablishmentMapper;
    private articleMapper: ArticleMapper;
    constructor() {
        this.personMapper = new PersonMapper();
        this.establishmentMapper = new EstablishmentMapper();
        this.articleMapper = new ArticleMapper();
    }
    toFront(favoriteEntity: IFavoriteEntity, cdnHost: string): IFavoriteFront {
        const mappedEstablishment =
            favoriteEntity.ItemType.Name === "Establishment"
                ? this.establishmentMapper.toFront({
                      establishmentEntity:
                          favoriteEntity.ResolvedItem as IEstablishmentWithContentPareEntity,
                      info: { cdnHost: cdnHost },
                  })
                : null;
        const mappedArticle =
            favoriteEntity.ItemType.Name === "Article"
                ? this.articleMapper.toFront(
                      favoriteEntity.ResolvedItem as IArticleEntityWithContent,
                      cdnHost
                  )
                : null;
        const mappedPerson = this.personMapper.toFront(
            { person: favoriteEntity.Person, content: null },
            null,
            null
        );
        return {
            id: favoriteEntity.Id,
            itemId: favoriteEntity.ItemId,
            favoriteType: favoriteEntity.ItemType,
            person: mappedPerson,
            establishment: mappedEstablishment,
            article: mappedArticle,
        };
    }
}
