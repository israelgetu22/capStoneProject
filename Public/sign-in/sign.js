const container = document.querySelector(".container");
const logBtn = document.querySelector(".check1");
const sighBtn = document.querySelector(".check");

logBtn.addEventListener("click", () => {
  location.assign("http://127.0.0.1:5501/Public/login-page/index.html");
});

sighBtn.addEventListener("click", () => {
  alert("Password must contain Capital Letter");
});
