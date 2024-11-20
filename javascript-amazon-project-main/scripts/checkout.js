import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //Multiple scripts and naming conflicts can arrive so ESM version is used and default export has been done without usage of {}
import { deliveryOptions } from "../data/deliveryOptions.js";

const today = dayjs();
const deliveryDate = today.add(7, "days");
// console.log(deliveryDate);
// console.log(deliveryDate.format("dddd, MMMM D"));

let cartSummaryHTML = "";

//Generate HTML for Checkout Items
//Loop through the cart
cart.forEach((cartItem) => {
  //Need to use Id to fetch the Product and its details::---
  //getting productId out of the cartItem
  const productId = cartItem.productId;
  //taking a variable for saving the result
  let matchingProduct;
  //Loop through the array
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  // console.log(cartItem);

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span> 
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                    matchingProduct.id
                  }">
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>`;
});

function deliveryOptionsHTML(matchingProduct) {
  //Since matchingProduct parameter is used below it is declared
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    //DATES INPUT
    //Today's date
    const today = dayjs();
    //In order to add options of dates
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, //declared in an array in deliveryOptions.js
      "days"
    );
    //To format the Date in the required one
    const dateString = deliveryDate.format("dddd, MMMM D");

    //PRICES INPUT
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    html =
      html +
      `<div class="delivery-option">
        <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
             <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
      </div>`;
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//DELETE LINK //How to know which product to remove from cart -- attach products' id to link element...used above

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // console.log("delete");
    const productId = link.dataset.productId; //dataset is used for DATA ATTRIBUTES
    // console.log(productId);
    removeFromCart(productId);
    // console.log(cart);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    ); //To select the specific container we need and saving into a variable
    // console.log(container);
    container.remove();
    updateCheckoutQuantityDisplay(); //problem fixed with updating instantly on deleting
  });
});

//UPDATE CHECKOUT QUANTITY in Display Function

export function updateCheckoutQuantityDisplay() {
  // let cartQuantity = 0;
  // cart.forEach((cartItem) => {
  //   cartQuantity = cartQuantity + cartItem.quantity;
  // });
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-return-to-home-link").innerHTML =
    // cartQuantity; //only number was popping, we needed to write 'items' too
    `${cartQuantity} items`;
}

updateCheckoutQuantityDisplay();

//UPDATE LINK
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    // console.log("update");
    const productId = link.dataset.productId; //dataset is used for DATA ATTRIBUTES
    // console.log(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    ); //To select the specific container we need and saving into a variable
    // console.log(container);
    container.classList.add("is-updating-quantity");
  });
});

//SAVE LINK
document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    // console.log("save");
    const productId = link.dataset.productId; //dataset is used for DATA ATTRIBUTES
    // console.log(productId);
    //post input quantity...save it
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    //Quantity Validation
    if (newQuantity < 0 || newQuantity >= 100) {
      alert("Quantity should be a number between 0-100");
      return;
    }
    updateQuantity(productId, newQuantity);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-updating-quantity");
    //To update the HTML for quantity and checkout items
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;
    updateCheckoutQuantityDisplay();
  });
});
