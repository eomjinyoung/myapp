"use strict";

(function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const headerEl = document.querySelector("#header");
        headerEl.insertAdjacentHTML("afterbegin", xhr.responseText);
        loadUserInfo();
      } else {
        alert("서버 요청이 실패했습니다!");
      }
    }
  };
  xhr.open("GET", `/header.html`, true);
  xhr.send();
})();

(function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const footerEl = document.querySelector("#footer");
        footerEl.insertAdjacentHTML("afterbegin", xhr.responseText);
      } else {
        alert("서버 요청이 실패했습니다!");
      }
    }
  };
  xhr.open("GET", `/footer.html`, true);
  xhr.send();
})();

function loadUserInfo() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.status == "success") {
          console.log("로그인 사용자 정보를 가져옴.");
          console.debug(response);
          document.querySelector("#login-btn").classList.add("item-hidden");
        } else {
          console.log("로그인 안됨 상태!");
          document.querySelector(".user-info").classList.add("item-hidden");
        }
      }
    }
  };
  xhr.open("GET", `/auth/userInfo`, true);
  xhr.send();
}

function logout(event) {
  event.preventDefault();

  requestCsrfToken(function (response) {
    if (response.status == "failure") {
      alert("CSRF 오류!");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          const response = JSON.parse(xhr.responseText);
          console.debug(response);
          if (response.status == "success") {
            location.href = "/home.html";
          }
        } else {
          alert("서버 요청이 실패했습니다!");
        }
      }
    };
    xhr.open("POST", `/logout`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRF-TOKEN", response.result);
    xhr.send();
  });
}

function requestCsrfToken(cb, error) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        console.debug(response);
        cb(response);
      } else {
        if (error) {
          error("CSRF 토큰 요청 오류!");
        }
      }
    }
  };
  xhr.open("GET", `/auth/csrf`, true);
  xhr.send();
}
