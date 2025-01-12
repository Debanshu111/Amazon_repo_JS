export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

//LOCAL STORAGE FUNCTION

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//ADD TO CART FUNCTION

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //QUANTITY DROPDOWN
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);
  if (matchingItem) {
    matchingItem.quantity = matchingItem.quantity + quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

//REMOVE FROM CART FUNCTION

export function removeFromCart(productId) {
  // let deletedProduct;
  const newCart = []; //NEW CART for Deleted product check
  cart.forEach((cartItem) => {
    //To check whatever is in the cart we loop
    if (cartItem.productId !== productId) {
      newCart.push(cartItem); //new cart will be the one after checking delete option, we push cartItem into New Cart
    }
  });
  cart = newCart; //post deletion check...cart is updated...since it's dependent on options lile delete...we change const to let for Cart at the beginning
  saveToStorage();
}

//CALCULATE CART QUANTITY FUNCTION
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + cartItem.quantity;
  });
  return cartQuantity;
  // return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

//UPDATE QUANTITY FUNCTION

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}

//UPDATE DELIVERY OPTION FUNTION

export function updateDeliveryOption(productId, deliveryOptionId) {
  //Match the delivery date selection as per checked in the radio options
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

//Load CART from Backend
export function loadCart(functionsBackEnd) {
  const xhr = new XMLHttpRequest(); //New Rqst Obj generated

  //To load after sending
  xhr.addEventListener("load", () => {
    functionsBackEnd(); //Callback- a function to run in future
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send(); //async, so it'll only send not wait for the request
}
// loadProducts();
