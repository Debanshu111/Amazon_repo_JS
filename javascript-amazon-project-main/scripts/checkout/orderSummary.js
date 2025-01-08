import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

//To load the delivery Date option from the radio button options instantaneously, we need to re-run the HTML, so put it in a function
export function renderOrderSummary() {
  let cartSummaryHTML = "";
  let isloader = true;

  cart.forEach((cartItem) => {
    //Need to use Id to fetch the Product and its details::---
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    if (matchingProduct.id) {
      isloader = false;
    } else {
      isloader = true;
    }
    // console.log(typeof matchingProduct);
    // console.log(matchingProduct.id);
    // console.log(cartItem);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML =
      cartSummaryHTML +
      `<div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
              <div class="delivery-date">Delivery date: ${dateString}</div>
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />
                <div class="cart-item-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-price">${matchingProduct.getPrice()}</div>
                  <div class="product-quantity">
                    <span> Quantity: 
                      <span class="quantity-label js-quantity-label-${
                        matchingProduct.id
                      }">${cartItem.quantity}</span> 
                    </span> 
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
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`;
  });
  // console.log(isloader);

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //To figure out which delivery option should be checked

      html =
        html +
        `<div class="delivery-option js-delivery-option"
         data-product-id="${matchingProduct.id}"
         data-delivery-option-id="${deliveryOption.id}">
          <input
              type="radio"
              ${isChecked ? "checked" : ""}
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

  document.querySelector(".js-order-summary").innerHTML =
    isloader && cart.length !== 0
      ? '<div class="loader"></div> '
      : cart.length === 0
      ? `<h1>No Data Found</h1>`
      : cartSummaryHTML;

  //DELETE LINK //How to know which product to remove from cart -- attach products' id to link element...used above

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId; //dataset is used for DATA ATTRIBUTES
      removeFromCart(productId); //update the deleted data
      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // ); //To select the specific container we need and saving into a variable
      // container.remove();
      renderOrderSummary();
      updateCheckoutQuantityDisplay();
      renderPaymentSummary();
    });
  });

  //UPDATE CHECKOUT QUANTITY in Display Function

  function updateCheckoutQuantityDisplay() {
    // let cartQuantity = 0;
    // cart.forEach((cartItem) => {
    //   cartQuantity = cartQuantity + cartItem.quantity;
    // });
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }
  updateCheckoutQuantityDisplay();

  //UPDATE LINK
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      // console.log("update");
      const productId = link.dataset.productId;
      // console.log(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      ); //To select the specific container we need and saving into a variable
      container.classList.add("is-updating-quantity");
    });
  });

  //SAVE LINK
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId; //dataset is used for DATA ATTRIBUTES
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
      renderPaymentSummary();
    });
  });

  //For each individual radio button click we need to display on the checkout item
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
