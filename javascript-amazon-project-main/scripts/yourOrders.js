import { cart, calculateCartQuantity } from "../data/cart.js";
import { products, getProduct, loadProductsFetch } from "../data/products.js";
import { renderFinalOrderPaymentSummary } from "./checkout/paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadPage() {
  try {
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        reject("error3");
        // resolve("value3");
      });
    });
  } catch (error) {
    // console.log("unexpected error. please try again later");
  }
}
loadPage();

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
    console.log(productId);

    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    // const matchingProduct = getProduct(productId);
    console.log(cartItem);

    // if (matchingProduct) {
    yourOrdersSummaryHTML =
      yourOrdersSummaryHTML +
      `
      <div class="ordered-products-details js-ordered-products-details">
              <img
                class="product-image-container"
                src="images/products/athletic-cotton-socks-6-pairs.jpg"
              />

              <div class="product-details">
                <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">Arriving on: August 15</div>
                <div class="product-quantity">
                <span>
                    Quantity:
                    <span
                      class="quantity-label js-quantity-label"
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
    // }
  });

  document.querySelector(".js-your-orders-summary").innerHTML =
    yourOrdersSummaryHTML;
  // localStorage.setItem("yourOrdersSummaryHTML", yourOrdersSummaryHTML);

  updateCartQuantity();
  displayFinalOrderPaymentTotal();
}
