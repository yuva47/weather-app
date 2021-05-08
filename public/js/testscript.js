let form = document.querySelector("form");
let address = document.getElementById("location");
let msgOne = document.querySelector("#msg-1");
let msgTwo = document.querySelector("#msg-2");

form.addEventListener("submit", (e) => {
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  e.preventDefault();
  fetch(`/weather?address=${address.value}`)
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
