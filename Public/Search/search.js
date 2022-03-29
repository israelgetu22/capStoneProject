const booksList = document.getElementById("booksList");
const searchBar = document.getElementById("searchBar");
let bookStore = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredBooks = bookStore.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchString) ||
      book.author.toLowerCase().includes(searchString)
    );
  });
  displayBooks(filteredBooks);
});

const loadBooks = async () => {
  try {
    const res = await fetch("http://localhost:4008/api/books");
    bookStore = await res.json();
    displayBooks(bookStore);
  } catch (err) {
    console.error(err);
  }
};

const displayBooks = (books) => {
  const htmlString = books
    .map((book) => {
      return `
            <li class="book">
                <h2>${book.title}</h2>
                <p>${book.author}</p>
                <img src="${book.imageURL}"></img>
            </li>
        `;
    })
    .join("");
  booksList.innerHTML = htmlString;
};

loadBooks();
