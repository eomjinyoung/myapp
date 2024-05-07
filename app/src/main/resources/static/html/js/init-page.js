document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.querySelector("#header");
  const footerEl = document.querySelector("#footer");

  (function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          headerEl.innerHTML = xhr.responseText;
        } else {
          alert("header.html을 가져오는데 실패했습니다!");
        }
      }
    };
    xhr.open("GET", `${rootPath}/header.html`, true);
    xhr.send();
  })();

  (function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          footerEl.innerHTML = xhr.responseText;
        } else {
          alert("footer.html을 가져오는데 실패했습니다!");
        }
      }
    };
    xhr.open("GET", `${rootPath}/footer.html`, true);
    xhr.send();
  })();
});
