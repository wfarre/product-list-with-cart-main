import { formatNumberWithTwoDecimals } from "../utils.js";

export const createNewDessertCard = (el, index) => {
  const dessertsContainer = document.getElementById("desserts");
  const dessertsItem = document.createElement("li");

  dessertsItem.classList.add("desserts__item");
  dessertsItem.innerHTML = `
  <article class="card" id=${el.id}>
      <div class="image-wrapper">
              <picture loading="lazy">
                <source media="(min-width:650px)" srcset=${el.image.tablet}>
                <source media="(min-width:800px)" srcset=${el.image.desktop}>
                <img src=${el.image.mobile} alt=${el.name}>
              </picture>
            </div>
    
            <button class="btn btn--add container items-center justify-center add-to-cart-btn">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
              Add to Cart
            </button>
            <div class="container container--cart add-quantity hidden">
                <button class="btn btn--icon decrement-btn" id="decrement-${
                  el.id
                }" aria-label="increment">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="">
                </button>
                <p class="quantity">0</p>
                <button class="btn btn--icon increment-btn" id="increment-${
                  el.id
                }" aria-label="decrement">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="">
                </button>
            </div>
            <ul class="info container container--column">
              <li class="info__item">
                <span class="type">${el.category}</span>
              </li>
              <li class="info__item">
                <h2 class="title">${el.name}</h2>
              </li>
              <li class="info__item">
                <p class="price">$${formatNumberWithTwoDecimals(el.price)}</p>
              </li>
            </ul>
          </article>
`;

  dessertsContainer.append(dessertsItem);
};
