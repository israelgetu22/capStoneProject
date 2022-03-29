const booksContainer = document.querySelector("#boooks-container");
const form = document.querySelector("form");
const getQuerySubmit = document.getElementById("getQuerySubmit");
const queryInput = document.getElementById("query-input");

console.log(booksContainer);
const baseURL = `http://localhost:4008/api/books`;

const booksCallback = ({ data: books }) => displayBooks(books);
const errCallback = (err) => console.log(err.response.data);

const getAllBooks = () =>
  axios.get(baseURL).then(booksCallback).catch(errCallback);
const createBook = (body) =>
  axios.post(baseURL, body).then(booksCallback).catch(errCallback);
const deleteBook = (id) =>
  axios.delete(`${baseURL}/${id}`).then(booksCallback).catch(errCallback);
function submitHandler(e) {
  e.preventDefault();

  let title = document.querySelector("#titlee");
  let imageURL = document.querySelector("#imgg");
  let authorName = document.querySelector("author");

  let bodyObj = {
    title: title.value,
    imageURL: imageURL.value,
  };

  createBook(bodyObj);

  title.value = "";
  imageURL.value = "";
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCard.innerHTML = `<img alt='book cover' src=${book.imageURL} class="book-cover"/>
    <p class="book-title">${book.title}</p>
    <p class="book-name">${book.author}</p>
    <input type="file" id="file-input" />
    <pre id="file-content" ></pre>
    <button onclick="document.getElementById('file-input').click();">Read</button>
    <button onclick="deleteBook(${book.id})">Trash</button> 
    `;

  booksContainer.appendChild(bookCard);
}

// search function and events
getQuerySubmit.addEventListener("click", () => {
  axios
    .get(`http://localhost:4008/api/inventory?item=${queryInput.value}`)
    .then((res) => addToView(res.data));
});

// handle response
function addToView(dataArr) {
  responseSection.innerHTML = null;

  if (dataArr.length === 0) {
    const p = document.createElement("p");
    const t = document.createTextNode("Response came back with no results!");
    p.appendChild(t);

    responseSection.appendChild(p);
  } else {
    dataArr.forEach((item) => {
      const p = document.createElement("p");
      const t = document.createTextNode(item);
      p.appendChild(t);

      responseSection.appendChild(p);
    });
  }
}

function displayBooks(arr) {
  booksContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createBookCard(arr[i]);
  }
}

//
form.addEventListener("submit", submitHandler);

getAllBooks();

//OpenFile function
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById("file-content");
  element.textContent = contents;
}

document
  .getElementById("file-input")
  .addEventListener("change", readSingleFile, false);
