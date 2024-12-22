import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-oop.js';
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

//promise runs function immediately, helps to run multiple func. simultaneously
// resolve lets us control when to go to next step
new Promise((resolve) => {
  console.log("Start Promise");
  //async loadProducts, given callback
  loadProducts(() => {
    console.log("Finished Loading");
    resolve();
  });
  //   console.log("promise");
}).then(() => {
  console.log("next step");
});

/*
//for backend...
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary(); //For regenerating all the Html = MVC = (model-view-controller)
  renderPaymentSummary();
});
*/
