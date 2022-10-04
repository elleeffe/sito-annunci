import {differenceInDays, format, startOfDay} from 'date-fns';
import locale from 'date-fns/locale/it';

export const formatAdsCardText = (text: string, parts: number) => {
  const finalText = text.split(' ').slice(0, parts).join(' ');
  if (text.split(' ').length > parts) {
    return finalText + '...';
  }
  return finalText;
};

export const formatDate = (date: number) => {
  const toReturn = format(date, 'dd/MMMM/yyyy', {locale});
  return toReturn.split('/').join(' ');
};

export const formatVisibilityExpiration = (
  date: string | number | Date | undefined
) => {
  if (date === undefined) {
    return undefined;
  }

  let daysOfDifference: number = differenceInDays(
    startOfDay(new Date(date)),
    startOfDay(new Date())
  );

  if (daysOfDifference < 0) {
    return undefined;
  }

  if (daysOfDifference === 0) {
    return 'Scade oggi';
  }

  if (daysOfDifference === 1) {
    return `Scade tra 1 giorno`;
  }

  return `Scade tra ${daysOfDifference} giorni`;
};

export const sleep = (ms: number) =>
  new Promise((res, rej) => setTimeout(res, ms));
