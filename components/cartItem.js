import { formatNumberWithTwoDecimals, getItemTotal } from "../utils.js";

export const createNewCartItem = (el) => {
  const cartContainer = document.getElementById("cart");
  const cartItem = document.createElement("li");

  const itemTotalPrice = getItemTotal(el.quantity, el.price);

  cartItem.classList.add("cart__item");
  cartItem.classList.add("container");
  cartItem.classList.add("space-between");
  cartItem.classList.add("items-center");
  cartItem.setAttribute("data-item-id", el.id);
  cartItem.innerHTML = `
            <div class="container container--column">
              <h3 class="name">${el.name}</h3>
              <ul class="container">
                <li class="quantity">${el.quantity}x</li>
                <li class="price">@ $${formatNumberWithTwoDecimals(
                  el.price
                )}</li>
                <li class="total">${formatNumberWithTwoDecimals(
                  itemTotalPrice
                )}</li>
              </ul>
            </div>
  
            <button class="btn btn--icon btn--remove remove-item-btn" aria-label="remove-item">
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path class="cross" fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
              </svg>
            </button>
          `;
  cartContainer.append(cartItem);
};
