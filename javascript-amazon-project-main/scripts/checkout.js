import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import "../data/cart-class.js";

async function loadPage() {
  try {
    // throw "error1"; //creates error, skips rest and goes to catch
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      // throw "error2";
      loadCart(() => {
        resolve("value3");
      });
    });
  } catch (error) {
    console.log("unexpected error. please try again later");
  } //any error detected inside try will be detected by catch
  //can use try catch with synchronous code...not used everywhere because it is used only for unexpected error handling

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
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
