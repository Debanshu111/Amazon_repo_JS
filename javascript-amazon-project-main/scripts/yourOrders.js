import { cart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
// import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderFinalOrderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

import { loadCart } from "../data/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  // CART ICON
  updateCartQuantity();
  //DATE
  const currentDate = dayjs().format("MMMM D, YYYY");
  document.getElementById("current-date").textContent = currentDate;
  //AMOUNT
  displayFinalOrderPaymentTotal();
  //ORDER ID
  const uniqueOrderId = document.getElementById("unique-order-id");
  uniqueOrderId.innerHTML = Math.floor(Math.random() * 1000000);

  //     // Load the generated HTML from localStorage and insert it into the element
  //   const yourOrdersSummaryHTML = localStorage.getItem("yourOrdersSummaryHTML");
  //   document.querySelector(".js-your-orders-summary").innerHTML = yourOrdersSummaryHTML;
});

//FUNCTIONs

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}

export function displayFinalOrderPaymentTotal() {
  const orderTotalAmount = document.getElementById("order-total-amount");
  orderTotalAmount.innerHTML = renderFinalOrderPaymentSummary();
}

export function displayYourOrders() {
  let yourOrdersSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    yourOrdersSummaryHTML =
      yourOrdersSummaryHTML +
      `
      <div class="ordered-products-details">
              <img
                class="product-image-container"
                src=${matchingProduct.image}
              />

              <div class="product-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">Arriving on: August 15</div>
                <div class="product-quantity">Quantity:  ${cartItem.quantity}</div>
                <button class="buy-again-button button-primary">
                  <img
                    class="buy-again-icon"
                    src="images/icons/buy-again.png"
                  />
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            </div>`;
  });

  document.querySelector(".js-your-orders-summary").innerHTML =
    yourOrdersSummaryHTML;

  updateCartQuantity();
  displayFinalOrderPaymentTotal();
}
