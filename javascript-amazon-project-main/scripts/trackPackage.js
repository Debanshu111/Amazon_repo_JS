import { cart, calculateCartQuantity } from "../data/cart.js";
import {
  getDeliveryOption,
  calculateDeliveryDate,
} from "../data/deliveryOptions.js";

let products = [];

async function loadPage() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");
    products = await response.json();

    // Displaying Your Orders after products are loaded
    trackYourOrders();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

loadPage();

document.addEventListener("DOMContentLoaded", () => {
  // Generating HTML from localStorage
  const trackYourOrdersHTML = localStorage.getItem("trackYourOrdersHTML");
  document.querySelector(".js-track-my-product").innerHTML =
    trackYourOrdersHTML;
  //Update cart quantity
  updateCartQuantity();
});

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}

export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export function trackYourOrders() {
  let trackYourOrdersHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    // console.log("Product ID:", productId);

    const matchingProduct = getProduct(productId);
    // console.log("Matching Product:", matchingProduct);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    if (matchingProduct && deliveryOption) {
      const deliveryDate = calculateDeliveryDate(deliveryOption);

      trackYourOrdersHTML =
        trackYourOrdersHTML +
        `<div class="tracked-product js-tracked-product-${matchingProduct.id}"></div>
        <div class="delivery-date">Arriving on ${deliveryDate}</div>

        <div class="product-info">
        ${matchingProduct.name}
        </div>

        <div class="product-info js-quantity-label-${matchingProduct.id}">Quantity: ${cartItem.quantity}</div>

        <img
          class="product-image"
          src=${matchingProduct.image}
        />`;
    }
  });
  document.querySelector(".js-track-my-product").innerHTML =
    trackYourOrdersHTML;
  localStorage.setItem("trackYourOrdersHTML", trackYourOrdersHTML);
}
