import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import "../data/cart-class.js";

//ASYNC-AWAIT used:-

async function loadPage() {
  try {
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        reject("error3");
        // resolve("value3");
      });
    });
  } catch (error) {
    // console.log("unexpected error. please try again later");
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*  Load Products using Promise and Fetch:-

Promise.all([
  loadProductsFetch(),
  // new Promise((resolve) => {
  //   loadProducts(() => {
  //     resolve();
  //   });
  // }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
