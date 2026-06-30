export const formatVND = (num: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
};
