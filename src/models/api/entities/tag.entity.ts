import { ICategoryEntity } from './category.entity';
import { IContentEntity } from './parts/content.entity';
export interface ITagEntity {
  Id: string;
  TagCategory: ICategoryEntity;
  Content: IContentEntity;
}
