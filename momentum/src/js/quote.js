const quote = document.querySelector(".quote");
const authorQuote = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
let randomNum;
let quoteLang = localStorage.getItem("lang") || "en";
let getRundomNum = () => {
  return Math.ceil(Math.random() * 24);
};

randomNum = getRundomNum();

export async function getQuotes(num, lang) {
  quoteLang = lang;
  let jsonUrl;
  lang == "ru"
    ? (jsonUrl = "./json/quoteRu.json")
    : lang == "en"
    ? (jsonUrl = "./json/quoteEn.json")
    : (jsonUrl = "./json/quoteBe.json");
  const quotes = jsonUrl;
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = data[num].text;
  authorQuote.textContent = data[num].author;
}
getQuotes(randomNum, quoteLang);

changeQuote.addEventListener("click", function () {
  randomNum = getRundomNum();
  getQuotes(randomNum, quoteLang);
});
