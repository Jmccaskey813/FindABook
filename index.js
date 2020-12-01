// https://www.googleapis.com/books/v1/volumes?q={search params}

const root = document.getElementById("root");

const blueBackground = document.createElement("div");
blueBackground.classList.add("root-fixed");
root.appendChild(blueBackground);

const results = document.createElement("div");
let userInput = document.getElementById("userinput");

const loader = document.querySelector(".loader");

//adds event listener for enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBooks();
});

//clears out any existing list on a new search query request
function deleteChildrenOfRoot() {
  root.innerHTML = "";
}

const searchBooks = () => {
  deleteChildrenOfRoot();
  root.appendChild(loader);
  let searchParams = userInput.value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q={${searchParams}}`)
    .then((response) => response.json())
    .then((results) => {
      let books = results.items;
      listItems(books);
    });
  userInput.value = "";
};

//lists items in DOM from searchBooks() function. uses data from response object
function listItems(returnedResults) {
  //clears loader or any existing searches
  deleteChildrenOfRoot();

  returnedResults.map((book) => {
    const { volumeInfo, searchInfo } = book;
    const container = document.createElement("div");
    const br = document.createElement("br");
    container.classList.add("container-sm");
    container.classList.add("box");

    const title = volumeInfo.title;

    const author = volumeInfo.authors[0];
    // const description = volumeInfo.description;
    const pageCount = `${volumeInfo.pageCount} pgs`;
    const previewLink = volumeInfo.previewLink;
    const bookImage = volumeInfo.imageLinks.thumbnail;

    // const textSnippet = searchInfo.textSnippet;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = `Title: ${title},`;
    container.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${author}`;
    container.appendChild(bookAuthor);

    const bookThumbnail = document.createElement("IMG");
    bookThumbnail.setAttribute("src", `${bookImage}`);
    container.appendChild(bookThumbnail);
    bookThumbnail.appendChild(br);

    const bookLength = document.createElement("span");
    bookLength.textContent = `length: ${pageCount}`;
    container.appendChild(bookLength);
    bookLength.appendChild(br);

    const sampleBtn = document.createElement("button");
    sampleBtn.classList.add("btn");
    sampleBtn.classList.add("btn-primary");
    sampleBtn.textContent = "read sample";
    sampleBtn.addEventListener("click", () => {
      window.location.href = `${previewLink}`;
    });
    container.appendChild(sampleBtn);
    container.appendChild(br);

    root.appendChild(container);
  });
}
root.appendChild(results);
