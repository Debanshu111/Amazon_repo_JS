//step3: get from local storage
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

//step1: create a function to add order
export function addOrder(order) {
  //   orders.push(order);
  orders.unshift(order);
  saveToStorage();
}
//step2: create a function to save to local storage
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
