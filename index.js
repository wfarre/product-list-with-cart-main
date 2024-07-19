import { createNewCartConfirmationItem } from "./components/cartConfirmationItem.js";
import { createNewCartItem } from "./components/cartItem.js";
import { createNewDessertCard } from "./components/dessertCard.js";
import { formatNumberWithTwoDecimals } from "./utils.js";

let cart = [];
let dessertsData = [];
let currentId = 0;

await fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    dessertsData = data.map((dessert, index) => {
      index++;
      return { ...dessert, id: index };
    });
    console.log(dessertsData);
  })
  .catch((error) => console.error(error));

dessertsData.forEach((dessert) => createNewDessertCard(dessert));

const incrementBtns = document.querySelectorAll(".increment-btn");
const decrementBtns = document.querySelectorAll(".decrement-btn");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const addQuantityBtns = document.querySelectorAll(".add-quantity");
const confirmationBtn = document.getElementById("confirm-btn");
const confirmationModal = document.getElementById("confirmation-modal");
const startNewOrderBtn = document.getElementById("start-new-order-btn");

const handleAddToCartClick = (e) => {
  const clickedBtn = e.target;
  const card = e.target.closest(".card");
  const quantityBtn = card.querySelector(".add-quantity");

  currentId = +card.id;
  const correspondingDessert = dessertsData.find(
    (dessert) => dessert.id === currentId
  );
  const correspondingItemInCart = cart.find((item) => item.id === currentId);

  if (!correspondingItemInCart) {
    cart = [...cart, { ...correspondingDessert, quantity: 0 }];
  }

  resetAddToCartButtons();

  clickedBtn.classList.add("hidden");
  quantityBtn.classList.remove("hidden");

  update(cart);

  const removeItemBtns = document.querySelectorAll(".remove-item-btn");

  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e);
      const item = e.target.closest(".cart__item");
      const itemId = +item.dataset.itemId;

      removeItem(itemId);
    });
  });
};

const update = (cart) => {
  const cartContainer = document.getElementById("cart");
  const emptyCart = document.getElementById("empty-cart");
  const confirmBtn = document.getElementById("confirm-btn");
  const total = document.getElementById("total");
  const neutral = document.getElementById("neutral");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    confirmBtn.classList.add("hidden");
    total.classList.add("hidden");
    neutral.classList.add("hidden");
    emptyCart.classList.remove("hidden");

    return;
  }
  emptyCart.classList.add("hidden");
  confirmBtn.classList.remove("hidden");
  total.classList.remove("hidden");
  neutral.classList.remove("hidden");

  cart.forEach((item) => {
    createNewCartItem(item);
  });

  const removeItemBtns = document.querySelectorAll(".remove-item-btn");

  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e);
      const item = e.target.closest(".cart__item");
      const itemId = +item.dataset.itemId;

      removeItem(itemId);
    });
  });

  getTotal(cart);
};

const getTotal = (cart) => {
  let total = 0;
  const totalHtml = document.getElementById("big-total");

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  totalHtml.textContent = formatNumberWithTwoDecimals(total);
};

update(cart);

const handleQuantity = (currentId, method) => {
  const cartItem = cart.find((item) => item.id === currentId);
  const htmlItem = document.getElementById(currentId);

  switch (method) {
    case "increment":
      cartItem.quantity += 1;
      break;
    case "decrement":
      cartItem.quantity > 0
        ? (cartItem.quantity -= 1)
        : (cartItem.quantity = 0);
      break;
    default:
      console.log("Oopsie");
      break;
  }

  const quantityHtml = htmlItem.querySelector(".quantity");
  update(cart);
  quantityHtml.textContent = String(cartItem.quantity);
};

incrementBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleQuantity(currentId, "increment");
  });
});

decrementBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleQuantity(currentId, "decrement");
  });
});

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleAddToCartClick(e);
  });
});

addQuantityBtns.forEach((btn) => {
  btn.addEventListener("mouseleave", () => {
    resetAddToCartButtons();
  });
});

const resetAddToCartButtons = () => {
  addToCartBtns.forEach((btn) => {
    btn.classList.remove("hidden");
  });
  addQuantityBtns.forEach((btn) => {
    btn.classList.add("hidden");
  });
};

confirmationBtn.addEventListener("click", () => {
  cart.forEach((item) => createNewCartConfirmationItem(item));
  confirmationModal.classList.add("open");
});

startNewOrderBtn.addEventListener("click", () => {
  resetOrder();
  update(cart);
});

const removeItem = (itemId) => {
  cart = cart.filter((item) => item.id !== itemId);
  const dessertsItemDom = document.getElementById(itemId);
  dessertsItemDom.querySelector(".quantity").textContent = 0;
  update(cart);
};

const resetOrder = () => {
  cart = [];
  confirmationModal.classList.remove("open");
  const dessertsDom = document.querySelectorAll(".desserts__item");
  dessertsDom.forEach(
    (dessert) => (dessert.querySelector(".quantity").textContent = 0)
  );
};
