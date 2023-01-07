let elInput = document.querySelector(".js-input");
let elForm = document.querySelector("form");

let elPrevBtn = document.querySelector(".js-prev-btn");
let elNextBtn = document.querySelector(".js-next-btn");

// let newArr = [];

let activePage = 1;

const render = (array, node) => {
  node.innerHTML = "";
  for (el of array) {
    let newItem = document.createElement("li");
    let newImg = document.createElement("img");
    let newTitle = document.createElement("h2");
    let newYear = document.createElement("p");
    let newType = document.createElement("p");

    newImg.setAttribute("src", el.Poster);
    newImg.setAttribute("width", "100%");
    newTitle.textContent = el.Title;
    newYear.textContent = el.Year;
    newType.textContent = el.Type;

    newItem.appendChild(newImg);
    newItem.appendChild(newTitle);
    newItem.appendChild(newYear);
    newItem.appendChild(newType);
    newItem.setAttribute(
      "class",
      "col-12 col-xl-5 text-center mt-3 bg-dark text-light"
    );
    elList.appendChild(newItem);
  }
};

const fetchFunc = () => {
  if (activePage == 1) {
    elPrevBtn.setAttribute("disabled", "true");
  } else {
    elPrevBtn.removeAttribute("disabled");
  }

  fetch(
    `https://www.omdbapi.com/?apikey=ba5d0120&s=${elInput.value}&page=${activePage}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        render(data.Search, elList);
        console.log(data);
      }

      if (activePage == Math.ceil(data.totalResults / 10)) {
        elNextBtn.setAttribute("disabled", "true");
      } else {
        elNextBtn.removeAttribute("disabled");
      }
    });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  fetchFunc();
  // elInput.value = "";
});

elPrevBtn.addEventListener("click", () => {
  activePage--;
  fetchFunc();
});

elNextBtn.addEventListener("click", () => {
  activePage++;
  fetchFunc();
});
