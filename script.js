const accessKey = "CriBHG3ux12d3OxbBkemfPUnn5yG7F-1JFM6JRv7vYk";

const formel = document.querySelector("form");
const inputel = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputel.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("search-result");
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const imglink = document.createElement("a");
    imglink.href = result.links.html;
    imglink.target = "_blank";
    imglink.textContent = result.alt_description;

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(imglink);
    searchResults.appendChild(imgWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formel.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
