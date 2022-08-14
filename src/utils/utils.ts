export const formatAdsCardText = (text: string, parts: number) => {
  const finalText = text.split(' ').slice(0, parts).join(' ');
  if (text.split(' ').length > parts) {
    return finalText + '...';
  }
  return finalText;
};
