const BASE_URL = "https://v6.exchangerate-api.com/v6/2e3f8ffee24a6d3da537d155";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoptions = document.createElement("option");
    newoptions.innerText = currCode;
    newoptions.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newoptions.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newoptions.selected = "selected";
    }
    select.append(newoptions);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal);

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/pair/${fromCurr.value}/${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rate;
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
