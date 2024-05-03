const headerEl = document.querySelector('#header');
const footerEl = document.querySelector('#footer');

const headerRequest = new Request('/header.html');
const footerRequest = new Request('/footer.html');

fetch(headerRequest)
.then((response) => response.text())
.then((result) => {
  console.debug(result);
  headerEl.innerHTML = result;
})
.catch((error) => {
  console.error(error);
});

fetch(footerRequest)
.then((response) => response.text())
.then((result) => {
  console.debug(result);
  footerEl.innerHTML = result;
})
.catch((error) => {
  console.error(error);
});