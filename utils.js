export const createNewArticle = (el, index) => {
  const dessertsContainer = document.getElementById("desserts");
  const article = document.createElement("article");

  article.classList.add("card");
  article.setAttribute("id", el.id);
  article.innerHTML = `
    <div class="image-wrapper">
            <picture>
              <source media="(min-width:650px)" srcset=${el.pictures.tablet}>
              <source media="(min-width:800px)" srcset=${el.pictures.desktop}>
              <img src=${el.pictures.mobile} alt="">
            </picture>
          </div>
  
          <button class="btn btn--add add-to-cart-btn">
            <img src="./assets/images/icon-add-to-cart.svg" alt="">
            Add to Cart
          </button>
  
          <div class="container container--cart add-quantity hidden">
              <button class="btn-cart decrement-btn" id="decrement-${el.id}">
                  <img src="./assets/images/icon-decrement-quantity.svg">
              </button>
              <p class="quantity">0</p>
              <button class="btn-cart increment-btn" id="increment-${el.id}">
                  <img src="./assets/images/icon-increment-quantity.svg">
              </button>
          </div>
  
  
          <ul class="info">
            <li class="info__item">
              <span class="type">${el.type}</span>
            </li>
            <li class="info__item">
              <h2 class="title">${el.title}</h2>
            </li>
            <li class="info__item">
              <p class="price">$${el.price}</p>
            </li>
          </ul>`;

  dessertsContainer.append(article);
};

export const createNewCartItem = (el) => {
  const cartContainer = document.getElementById("cart");
  const cartItem = document.createElement("li");

  const itemTotalPrice = el.quantity * el.price;

  cartItem.classList.add("cart__item");
  cartItem.classList.add("container");
  cartItem.classList.add("space-between");
  cartItem.classList.add("items-center");
  cartItem.innerHTML = `
          <div class="container container--column">
            <h3 class="name">${el.title}</h3>
            <ul class="container">
              <li class="quantity">${el.quantity}x</li>
              <li class="price">@ $${el.price}</li>
              <li class="total">${itemTotalPrice}</li>
            </ul>
          </div>

          <button class="btn btn--remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path class="cross" fill="#CAAFA7"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
            </svg>
          </button>
        `;

  cartContainer.append(cartItem);
};
