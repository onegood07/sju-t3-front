export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(amount));
};
