import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-oop.js';
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

//for backend...
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary(); //For regenerating all the Html = MVC = (model-view-controller)
  renderPaymentSummary();
});
