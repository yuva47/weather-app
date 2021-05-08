let url = window.location.href;

let form = document.querySelector("form");
let address = document.getElementById("location");
let msgOne = document.querySelector("#msg-1");
let msgTwo = document.querySelector("#msg-2");

form.addEventListener("submit", (e) => {
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  e.preventDefault();
  fetch(`${url.split("/")[0]}/weather?address=${address.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
});
