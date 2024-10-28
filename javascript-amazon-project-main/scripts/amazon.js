let productsHTML = '';
products.forEach((itemsInAmazonForUsers) => {
productsHTML = productsHTML +
  `<div class="product-container"> 
          <div class="product-image-container">
            <img class="product-image"
              src="${itemsInAmazonForUsers.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${itemsInAmazonForUsers.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(itemsInAmazonForUsers.rating.stars.toFixed(1))}.png">
            <div class="product-rating-count link-primary">
            ${itemsInAmazonForUsers.rating.count}
            </div>
          </div>
          <div class="product-price">
            $${(itemsInAmazonForUsers.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary addToCart" >
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.addToCart').forEach((button) => {
  button.addEventListener('click', () => {
  })
});