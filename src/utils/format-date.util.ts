export const customFormatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
