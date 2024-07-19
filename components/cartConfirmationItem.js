import { getItemTotal, formatNumberWithTwoDecimals } from "../utils.js";

export const createNewCartConfirmationItem = (item) => {
  const cartConfirmation = document.getElementById("cart-confirmation");
  const cartItem = document.createElement("li");
  const itemTotal = getItemTotal(item.price, item.quantity);

  cartItem.classList.add("list__item");
  cartItem.classList.add("container");
  cartItem.classList.add("items-center");

  cartItem.innerHTML = `
          <div class="image-wrapper thumbnail">
            <img src=${item.image.thumbnail} alt=${item.name}>
          </div>
          <div class="list__item__info container container--column">
            <h4 class="name">${item.name}</h4>
            <div class="container">
              <p class="quantity">${item.quantity}x</p>
              <p class="price">@$${formatNumberWithTwoDecimals(item.price)}</p>
            </div>
          </div>
          <p class="list__item__total">
            $${formatNumberWithTwoDecimals(itemTotal)}
          </p>`;

  cartConfirmation.append(cartItem);
};
