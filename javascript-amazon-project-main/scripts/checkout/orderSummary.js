import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //Multiple scripts and naming conflicts can arrive so ESM version is used and default export has been done without usage of {}
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//To load the delivery Date option from the radio button options instantaneously, we need to re-run the HTML, so put it in a function
export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    //Need to use Id to fetch the Product and its details::---
    //getting productId out of the cartItem
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    //For Delivery Date on the product display, we take deliveryOptionId out of the cartItem and save it in a var
    const deliveryOptionId = cartItem.deliveryOptionId;
    //To check if it is present in the cartItem
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

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
                  <div class="product-price">${formatCurrency(
                    matchingProduct.priceCents
                  )}</div>
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

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

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

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

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
      updateCheckoutQuantityDisplay(); //problem fixed with updating instantly on deleting
      renderPaymentSummary(); //regenerate all the html for payment
    });
  });

  //UPDATE CHECKOUT QUANTITY in Display Function

  function updateCheckoutQuantityDisplay() {
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

  //For each individual radio button click we need to display on the checkout item
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // const { productId, deliveryOptionId } = element.dataset; shorthand property
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId); //update the deliveryOptionId in the cart
      renderOrderSummary(); //To render it instantaneously, fucntion calling/re-running itself = RECURSION
      renderPaymentSummary(); //generate updated shipping payments
    });
  });
}
