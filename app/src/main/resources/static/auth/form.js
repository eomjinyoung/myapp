"use strict";

const email = document.querySelector("#email");
const password = document.querySelector("#password");

document.querySelector("#login-btn").onclick = () => {
  requestCsrfToken(function (response) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.status == "success") {
            console.debug("로그인 성공!");
            location.href = "/home.html";
          } else {
            alert(response.error);
          }
        } else {
          alert("서버 요청이 실패했습니다!");
        }
      }
    };
    xhr.open("POST", `/auth/login`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRF-TOKEN", response.result);
    var messageBody =
      "email=" +
      window.encodeURIComponent(email.value) +
      "&password=" +
      window.encodeURIComponent(password.value);
    xhr.send(messageBody);
  });
};
