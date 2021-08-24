const myUlFilm = document.querySelector(".js-films");
const templateList = document.querySelector("#film").content;
const newFragmentList = document.createDocumentFragment();

const myForm = document.querySelector(".form");
const myInput = document.querySelector(".form__input");

const myBtnBox = document.querySelector(".page-buttons");
const newFragmentBtn = document.createDocumentFragment();

const array = {
  num: 1,
};
console.log(array.num);
function fetchMovie(inputValue) {
  fetch(`https://omdbapi.com?apikey=9f3dffb4&s=${inputValue}&page=${array.num}`)
    .then((respons) => respons.json())
    .then((data) => {
      renderCinemaBtn(data);

      myUlFilm.innerHTML = "";
      myBtnBox.innerHTML = "";

      data.Search.forEach((kino) => {
        renderCinema(kino);
      });
      myUlFilm.append(newFragmentList);
      myBtnBox.append(newFragmentBtn);
    });
}

fetchMovie("need for speed");

const renderCinema = (kino) => {
  const listClone = templateList.cloneNode(true);

  const cloneImg = listClone.querySelector(".js-film-img");
  const cloneP = listClone.querySelector(".js-film-title");
  const cloneSpan = listClone.querySelector(".js-film-year");

  cloneImg.src = kino.Poster;
  cloneP.textContent = kino.Title;
  cloneSpan.textContent = kino.Year;
  newFragmentList.appendChild(listClone);
};

const searchFilm = () => {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    inputValue = myInput.value.trim();
    array.num = 1;
    fetchMovie(inputValue);

    // myInput.value = "";
  });
};
searchFilm();

let renderCinemaBtn = (data) => {
  var arraySum = Math.ceil(Number(data.totalResults) / 10);

  for (let i = 1; i <= arraySum; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    btn.dataset.id = i;
    btn.classList = "btn-page";

    btn.addEventListener("click", function (e) {
      const numId = e.currentTarget.dataset.id;
      array.num = numId;
      // console.log(inputValue);
      if (myInput.value == "") {
        fetchMovie("need for speed");
      } else {
        fetchMovie(inputValue);
      }
    });

    newFragmentBtn.appendChild(btn);
  }
};
