import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
} from 'typeorm';
import { Store } from '../../entities/store.entity';

export type GetOneStoreSelects =
  | FindOptionsSelect<Store>
  | FindOptionsSelectByString<Store>;

export type GetOneStoreRelations =
  | FindOptionsRelationByString
  | FindOptionsRelations<Store>;

export type SearchOneStore =
  | FindOptionsWhere<Store>
  | FindOptionsWhere<Store>[];
export interface GetOneStoreOptions {
  search: SearchOneStore;
  select?: GetOneStoreSelects;
  relations?: GetOneStoreRelations;
}
