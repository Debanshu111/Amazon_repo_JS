import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-oop.js';
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

//In order to run all the promise simultaneously we use Promise.all()
Promise.all([
  loadProductsFetch(),
  // //promise runs function immediately, helps to run multiple func. simultaneously, helps keeping code flat
  // // resolve lets us control when to go to next step
  // new Promise((resolve) => {
  //   //async loadProducts, given callback
  //   loadProducts(() => {
  //     resolve("value1");
  //   });
  // }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  // console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
//promise runs function immediately, helps to run multiple func. simultaneously, helps keeping code flat
// resolve lets us control when to go to next step
new Promise((resolve) => {
  //async loadProducts, given callback
  loadProducts(() => {
    resolve("value1");
  });
})
  .then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    //  Multiple callbacks can cause nesting
    renderCheckoutHeader();
    renderOrderSummary(); //For regenerating all the Html = MVC = (model-view-controller)
    renderPaymentSummary();
  });
*/

/* TRIAL

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

/*
//for backend...
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary(); //For regenerating all the Html = MVC = (model-view-controller)
    renderPaymentSummary();
  });
});
*/
