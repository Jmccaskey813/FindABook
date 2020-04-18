// https://www.googleapis.com/books/v1/volumes?q={search params}

const root = document.getElementById("root");

const results = document.createElement("div");
let userInput = document.getElementById("userinput");

const searchBooks = () => {
  let searchParams = userInput.value;
  console.log(searchParams);
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
  returnedResults.map((book) => {
    const { volumeInfo, searchInfo } = book;
    const container = document.createElement("div");
    const br = document.createElement("br");
    container.classList.add("container-sm");
    container.textContent = `${volumeInfo.title}`;
    const title = volumeInfo.title;

    const author = volumeInfo.authors.map((people, index) => {
      //   people.length > 1 ? people.toString() : people[0];
      people[index];
    });
    const description = volumeInfo.description;
    const pageCount = `${volumeInfo.pageCount} pgs`;
    const previewLink = volumeInfo.previewLink;
    const bookImage = volumeInfo.imageLinks.thumbnail;

    const textSnippet = searchInfo.textSnippet;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${author}`;
    container.appendChild(bookAuthor);

    const bookTitle = document.createElement("span");
    bookTitle.textContent = `${title}`;
    container.appendChild(bookTitle);

    const bookThumbnail = document.createElement("IMG");
    bookThumbnail.setAttribute("src", `${bookImage}`);
    container.appendChild(bookThumbnail);

    const sampleBtn = document.createElement("button");
    sampleBtn.classList.add("btn");
    sampleBtn.classList.add("btn-primary");
    sampleBtn.textContent = "read sample";
    sampleBtn.addEventListener("click", () => {
      window.location.href = `${previewLink}`;
    });
    container.appendChild(sample);

    // hide and add event listener to show. Way too long for list view
    // const bookDescription = document.createElement("span");
    // bookDescription.textContent = `${description}`;
    // container.appendChild(bookDescription);

    root.appendChild(container);

    console.log(book);
  });
}

root.appendChild(results);
