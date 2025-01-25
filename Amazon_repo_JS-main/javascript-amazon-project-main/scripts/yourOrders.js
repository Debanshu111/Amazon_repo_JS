import { cart, calculateCartQuantity } from "../data/cart.js";
import { renderFinalOrderPaymentSummary } from "./checkout/paymentSummary.js";
import {
  getDeliveryOption,
  calculateDeliveryDate,
} from "../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let products = [];

async function loadPage() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");
    products = await response.json();
    // console.log(products);

    // Displaying Your Orders after products are loaded
    displayYourOrders();
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

loadPage();

document.addEventListener("DOMContentLoaded", () => {
  //DATE
  const currentDate = dayjs().format("MMMM D, YYYY");
  document.getElementById("current-date").textContent = currentDate;
  //AMOUNT
  const orderTotalAmount = document.getElementById("order-total-amount");
  const totalCents = localStorage.getItem("totalCents"); // Retrieve totalCents from localStorage
  orderTotalAmount.innerHTML = `$${formatCurrency(totalCents)}`;
  //ORDER ID
  const uniqueOrderId = document.getElementById("unique-order-id");
  uniqueOrderId.innerHTML = Math.floor(Math.random() * 1000000);

  // Generating HTML from localStorage
  const yourOrdersSummaryHTML = localStorage.getItem("yourOrdersSummaryHTML");
  document.querySelector(".js-your-orders-summary").innerHTML =
    yourOrdersSummaryHTML;

  // Update cart quantity
  updateCartQuantity();
});

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}

export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export function displayYourOrders() {
  let yourOrdersSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    // console.log("Product ID:", productId);

    const matchingProduct = getProduct(productId);
    // console.log("Matching Product:", matchingProduct);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    if (matchingProduct && deliveryOption) {
      const deliveryDate = calculateDeliveryDate(deliveryOption);

      yourOrdersSummaryHTML =
        yourOrdersSummaryHTML +
        `
<div class="ordered-products-details js-ordered-products-details-${matchingProduct.id}">
<img class="product-image-container" src=${matchingProduct.image} />
<div class="product-details">
<div class="product-name">${matchingProduct.name}</div>
<div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
<div class="product-quantity">
<span>Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
</div>
</div>
<div>
<button class="buy-again-button button-primary">
<img class="buy-again-icon" src="images/icons/buy-again.png" />
<span class="buy-again-message">Buy it again</span>
</button>
<div class="product-actions">
<a href="tracking.html" class="js-track-package" data-product-id="${matchingProduct.id}">
<button class="track-package-button button-secondary">Track package</button>
</a>
</div>
</div>

</div>`;
    }
  });

  document.querySelector(".js-your-orders-summary").innerHTML =
    yourOrdersSummaryHTML;
  localStorage.setItem("yourOrdersSummaryHTML", yourOrdersSummaryHTML);

  document.querySelectorAll(".js-track-package").forEach((element) => {
    element.addEventListener("click", (event) => {
      const productId = element.dataset.productId;
      localStorage.setItem("trackingProductId", productId);
    });
  });
}
