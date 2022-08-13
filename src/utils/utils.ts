import {categoryOptions} from './config';

export const getCategoryLabel = (category: Category) =>
  categoryOptions.find((el) => el.value === category)?.label || '';

export const formatAdsCardText = (text: string, parts: number) => {
  const finalText = text.split(' ').slice(0, parts).join(' ');
  if (text.split(' ').length > parts) {
    return finalText + '...';
  }
  return finalText;
};
