//classes looks like the object that it generates, has both properties and methods(func.)
//has constructor(let us run setup codes)[helps to group]

class Cart {
  cartItems = undefined;
  #localStorageKey = undefined; //# is used to make it private, to be used inside the class

  //after creating the Cart obj., need setup code
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; //we declare the parameter
    this.#loadFromStorage();
  }

  //LOAD FROM STORAGE FUNCTION
  #loadFromStorage() {
    //made private
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); //since localStorageKey doesn't exist inside the method(func inside class), we declared it above.

    if (!this.cartItems) {
      this.cartItems = [
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
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)); //Saving to local storage(only saves strings, so cart has been converted to string)
  }

  //ADD TO CART FUNCTION
  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    //QUANTITY DROPDOWN
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector?.value);
    //Cart Item already in Cart?
    if (matchingItem) {
      matchingItem.quantity = matchingItem.quantity + quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: "1", //used  1 for now...need to change later
      });
    }
    this.saveToStorage(); //since already inside the obj.
  }

  //REMOVE FROM CART FUNCTION
  removeFromCart(productId) {
    // let deletedProduct;
    const newCart = []; //NEW CART for Deleted product check
    this.cartItems.forEach((cartItem) => {
      //To check whatever is in the cart we loop
      if (cartItem.productId !== productId) {
        newCart.push(cartItem); //new cart will be the one after checking delete option, we push cartItem into New Cart
      }
    });
    this.cartItems = newCart; //post deletion check...cart is updated...since it's dependent on options lile delete...we change const to let for Cart at the beginning
    this.saveToStorage();
  }

  //CALCULATE CART QUANTITY FUNCTION used at multiple files, to optiimize
  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity = cartQuantity + cartItem.quantity;
    });
    return cartQuantity;
  }

  //UPDATE QUANTITY FUNCTION
  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  //UPDATE DELIVERY OPTION FUNTION
  updateDeliveryOption(productId, deliveryOptionId) {
    //Match the delivery date selection as per checked in the radio options
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop"); //new obj generated == each obj created from class is called INSTANCE
const businessCart = new Cart("cart-business");

console.log(cart, businessCart);
