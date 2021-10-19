const quote = document.querySelector(".quote");
const authorQuote = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

let getRundomNum = () => {
  return Math.ceil(Math.random() * 24);
};

let randomNum = getRundomNum();

async function getQuotes(num) {
  const quotes = "./json/quote.json";
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = data[num].text;
  authorQuote.textContent = data[num].author;
}
getQuotes(randomNum);

changeQuote.addEventListener("click", function () {
  randomNum = getRundomNum();
  getQuotes(randomNum);
});
