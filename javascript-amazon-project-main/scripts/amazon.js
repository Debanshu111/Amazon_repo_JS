import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
products.forEach((product) => {
  productsHTML =
    productsHTML +
    `<div class="product-container"> 
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary addToCart"
           data-product-id="${product.id}"
           >
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

//UPDATE CART QUANTITY

function updateCartQuantity() {
  // let cartQuantity = 0;
  // cart.forEach((cartItem) => {
  //   cartQuantity = cartQuantity + cartItem.quantity;
  // });
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
}

//TIMEOUTS

function popUpMessageTimeout(productId) {
  //MESSAGE
  const addedMssg = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMssg.classList.add("addedToCartMssg"); //used for registering it if clicked on add more than once for the same product...linked to below to check if it matches
  //TIMEOUTS for Message
  const addedMessageTimeouts = {};
  const prevTimeoutId = addedMessageTimeouts[productId];
  if (prevTimeoutId) {
    clearTimeout(prevTimeoutId);
  }
  // setTimeout(() => {
  const timeoutId = setTimeout(() => {
    addedMssg.classList.remove("addedToCartMssg");
  }, 3000);
}

updateCartQuantity(); //For updating always even on Amazon html page

document.querySelectorAll(".addToCart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId; //dataset is used for DATA ATTRIBUTES
    addToCart(productId);
    updateCartQuantity();
    popUpMessageTimeout(productId);
  });
});
