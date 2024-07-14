import { dessertsData } from "./data.js";
import { createNewArticle, createNewCartItem } from "./utils.js";

let cart = [];
let currentId = 0;

dessertsData.forEach((dessert) => createNewArticle(dessert));

const incrementBtns = document.querySelectorAll(".increment-btn");
const decrementBtns = document.querySelectorAll(".decrement-btn");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const addQuantityBtns = document.querySelectorAll(".add-quantity");

const handleAddToCartClick = (e) => {
  const clickedBtn = e.target;
  const card = e.target.closest(".card");
  const quantityBtn = card.querySelector(".add-quantity");
  currentId = +card.id;
  const correspondingDessert = dessertsData.find(
    (dessert) => dessert.id === currentId
  );

  if (!cart.includes(correspondingDessert)) {
    // cart.push(correspondingDessert);
    cart = [...cart, correspondingDessert];
  }

  resetAddToCartButtons();

  clickedBtn.classList.add("hidden");
  quantityBtn.classList.remove("hidden");

  update(cart);
};

const update = (cart) => {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  if (cart.length === 0)
    return (cartContainer.innerHTML = `<li>The cart is empty.</li>`);
  cart.forEach((item) => {
    createNewCartItem(item);
  });

  getTotal(cart);
};

const getTotal = (cart) => {
  let total = 0;
  const totalHtml = document.getElementById("big-total");

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  totalHtml.textContent = String(total);
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
    console.log(e);
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

console.log("hello");
