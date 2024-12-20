const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
// xhr.open("GET", "https://supersimplebackend.dev/products/first"); //setup rqst  //what type of mssage, where to
xhr.open("GET", "https://supersimplebackend.dev"); //setup rqst  //what type of mssage, where to
//using the browser is same as making a GET request
xhr.send();
