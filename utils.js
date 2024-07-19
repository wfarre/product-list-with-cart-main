export const formatNumberWithTwoDecimals = (number) =>
  number.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const getItemTotal = (price, quantity) => price * quantity;

export const getTotal = (cart) => {
  let total = 0;
  // const totalHtml = document.getElementById("big-total");
  // const confirmationTotal = document.getElementById("confimation-total");

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  // totalHtml.textContent = formatNumberWithTwoDecimals(total);
  // confirmationTotal.textContent = formatNumberWithTwoDecimals(total);
  return total;
};

export const updateTotal = (total) => {
  console.log(total);
  const totalHtml = document.getElementById("big-total");
  const confirmationTotal = document.getElementById("confirmation-total");
  if (totalHtml) {
    totalHtml.textContent = formatNumberWithTwoDecimals(total);
  }
  console.log(confirmationTotal);
  if (confirmationTotal) {
    console.log("hello");
    confirmationTotal.textContent = formatNumberWithTwoDecimals(total);
  }
};
