import { cart, calculateCartQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { renderFinalOrderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

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
  // T1
  // const yourOrdersSummaryHTML = localStorage.getItem("yourOrdersSummaryHTML");
  // document.querySelector(".js-your-orders-summary").innerHTML =
  //   yourOrdersSummaryHTML;
  // console.log(yourOrdersSummaryHTML);
  //T2
  // const yourOrdersSummaryHTML = displayYourOrders();
  // document.querySelector(".js-your-orders-summary").innerHTML =
  //   yourOrdersSummaryHTML;
  // console.log(yourOrdersSummaryHTML);

  displayYourOrders();
});

//FUNCTIONs

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}

export function displayFinalOrderPaymentTotal() {
  //used class
  const totalAmountPostOrder = renderFinalOrderPaymentSummary();
  document.querySelector(".js-order-total-amount").innerHTML =
    totalAmountPostOrder;
  //used id
  // const orderTotalAmount = document.getElementById("order-total-amount");
  // orderTotalAmount.innerHTML = renderFinalOrderPaymentSummary();
}

export function displayYourOrders() {
  let yourOrdersSummaryHTML = "";

  // if typeof cart is not an array, then console.error...cart needs to be an array to loop through
  if (!cart || !Array.isArray(cart)) {
    console.error("Cart is not loaded properly.");
    return;
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    console.log("Product ID:", productId);
    const matchingProduct = getProduct(productId);
    console.log("Matching Product:", matchingProduct);

    if (matchingProduct) {
      yourOrdersSummaryHTML =
        yourOrdersSummaryHTML +
        `
      <div class="ordered-products-details js-ordered-products-details-${matchingProduct.id}">
              <img
                class="product-image-container"
                src="${matchingProduct.image}"
              />

              <div class="product-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">Arriving on: August 15</div>
                <div class="product-quantity">
                <span>
                    Quantity:
                    <span
                      class="quantity-label js-quantity-label-${matchingProduct.id}"
                      >${cartItem.quantity}</span
                    >
                  </span>
                </div>
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
    }
  });

  document.querySelector(".js-your-orders-summary").innerHTML =
    yourOrdersSummaryHTML;
  // localStorage.setItem("yourOrdersSummaryHTML", yourOrdersSummaryHTML);

  updateCartQuantity();
  displayFinalOrderPaymentTotal();
}
