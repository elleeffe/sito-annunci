import {categoryOptions} from './config';

export const getCategoryLabel = (category: Category) =>
  categoryOptions.find((el) => el.value === category)?.label || '';
