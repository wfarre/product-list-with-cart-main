export const formatNumberWithTwoDecimals = (number) =>
  number.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const getItemTotal = (price, quantity) => price * quantity;
