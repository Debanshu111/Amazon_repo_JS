import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    //For Product's COST
    const product = getProduct(cartItem.productId);
    productPriceCents =
      productPriceCents + product?.priceCents * cartItem.quantity;
    //For Shipping COST
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents = shippingPriceCents + deliveryOption?.priceCents;
  });
  //For the rest calculations
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = (totalBeforeTaxCents * 0.1).toFixed(2);
  const totalCents = Number(totalBeforeTaxCents) + Number(taxCents);
  localStorage.setItem("totalCents", totalCents); // Store totalCents in localStorage
  const paymentSummaryHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      // alert("Thank you for your order!");
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(cart), //error about cart not being an array, so can't use
          body: JSON.stringify({ cart: cart }),
        });
        //To get the response data from the server
        const order = await response.json();
        // console.log(order);
        addOrder(order);
      } catch (error) {
        console.log("Unexpected Error. Try again later.");
      }
      window.location.href = "orders.html";
    });
}

export function renderFinalOrderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    //For Product's COST
    const product = getProduct(cartItem.productId);
    productPriceCents =
      productPriceCents + product?.priceCents * cartItem.quantity;
    //For Shipping COST
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents = shippingPriceCents + deliveryOption?.priceCents;
  });
  //For the rest calculations
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = (totalBeforeTaxCents * 0.1).toFixed(2);
  const totalCents = Number(totalBeforeTaxCents) + Number(taxCents);
  localStorage.setItem("totalCents", totalCents); // Store totalCents in localStorage
  return `$${formatCurrency(totalCents)}`;
}
