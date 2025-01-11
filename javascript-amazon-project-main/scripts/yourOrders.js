import { cart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
// import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {
  renderPaymentSummary,
  renderFinalOrderPaymentSummary,
} from "./checkout/paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

import { loadCart } from "../data/cart.js";

//DATE
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = dayjs().format("MMMM D, YYYY");
  document.getElementById("current-date").textContent = currentDate;
});
//AMOUNT
const orderTotalAmount = document.getElementById("order-total-amount");
orderTotalAmount.innerHTML = renderFinalOrderPaymentSummary();
//ORDER ID
const uniqueOrderId = document.getElementById("unique-order-id");
uniqueOrderId.innerHTML = Math.floor(Math.random() * 1000000);
//FUNCTION
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

  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}
