export const limitText = (text: string, limit = 65): string => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};
