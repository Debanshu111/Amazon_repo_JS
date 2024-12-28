import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid); //for backend

function renderProductsGrid() {
  //renderProductsGrid() used for calling from the backend
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
    const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-cart-Quantity").innerHTML = cartQuantity;
  }

  //TIMEOUTS

  function popUpMessageTimeout(productId) {
    //MESSAGE
    const addedMssg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMssg.classList.add("addedToCartMssg");
    //TIMEOUTS for Message
    const addedMessageTimeouts = {};
    const prevTimeoutId = addedMessageTimeouts[productId];
    if (prevTimeoutId) {
      clearTimeout(prevTimeoutId);
    }
    const timeoutId = setTimeout(() => {
      addedMssg.classList.remove("addedToCartMssg");
    }, 3000);
  }

  updateCartQuantity();

  document.querySelectorAll(".addToCart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      popUpMessageTimeout(productId);
    });
  });
}
