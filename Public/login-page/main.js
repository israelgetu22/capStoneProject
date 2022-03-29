const booksContainer = document.querySelector("#boooks-container");
console.log(booksContainer);
const baseURL = `http://localhost:4008/api/books`;

const booksCallback = ({ data: books }) => displayBooks(books);
const errCallback = (err) => console.log(err);

const getAllBooks = () =>
  axios.get(baseURL).then(booksCallback).catch(errCallback);

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCard.innerHTML = `<img alt='book cover image' src=${book.imageURL} class="book-cover-image"/>
    <p class="title">${book.title}</p>
    <div class="btns-container">

        <p class="book-author">$${book.author}</p>

       <button onclick="deleteBook(${book.id})">delete</button>
    `;

  booksContainer.appendChild(bookCard);
}

function displayBooks(arr) {
  booksContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createBookCard(arr[i]);
  }
}

getAllBooks();

//Login to the next page
window.onload = () => {
  this.sessionStorage.setItem("username", "israelgetu@gmail.com");
  this.sessionStorage.setItem("password", "123456");
};

var input = document.getElementsByTagName("input");
var login = document.getElementById("log-in");
var form = document.querySelector("form");
form.onsubmit = () => {
  return false;
};

login.onclick = () => {
  if (input[0].value != "" && input[1].value != "") {
    if (
      input[0].value == sessionStorage.getItem("username") &&
      input[1].value == sessionStorage.getItem("password")
    ) {
      console.log("Everything is work");
      location.assign("http://127.0.0.1:5500/public/addbook/addbook.html");
      document.cookie = "username=" + input[0].value;
      document.cookie = "password=" + input[1].value;
    } else {
      if (input[0].value != sessionStorage.getItem("username")) {
        input[0].nextElementSibling.textContent = "Username NOT match";
        setTimeout(() => {
          input[0].nextElementSibling.textContent = "";
        }, 2000);
      }
      if (input[1].value != sessionStorage.getItem("password")) {
        input[1].nextElementSibling.textContent = "Password NOT match";
        setTimeout(() => {
          input[1].nextElementSibling.textContent = "";
        }, 2000);
        // alert("Username and Password NOT match");
      }
    }
  } else {
    if (input[0].value == "") {
      input[0].nextElementSibling.textContent = "Username is empty";
      setTimeout(() => {
        input[0].nextElementSibling.textContent = "";
      }, 3000);
    }
    if (input[1].value == "") {
      input[1].nextElementSibling.textContent = "Password is empty";
      setTimeout(() => {
        input[1].nextElementSibling.textContent = "";
      }, 3000);
    }
  }
};
