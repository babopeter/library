const showForm = document.getElementById("showForm");
const addBook = document.getElementById("addBook");
const addAuthor = document.getElementById("addAuthor");
const addTitle = document.getElementById("addTitle");
const addPageNum = document.getElementById("addPageNum");
const addReadStatus = document.getElementById("addReadStatus");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn"); 


const myLibrary = [
    new Book("Assassin's Apprentice", "Robin Hobb", 392, true),
    new Book("The Eye of the World", "Robert Jordan", 685, true),
    new Book("The Way of Kings", "Brandon Sanderson", 1007, false)
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    let book = new Book(
        addTitle.value,
        addAuthor.value,
        addPageNum.value,
        addReadStatus.value === "true"
    )
    myLibrary.push(book);
    console.log(`${addReadStatus.value}`);
}

function displayBook() {
    
    const container = document.getElementById("book-container");
    container.innerHTML = "";
    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const titlePara = document.createElement("p");
        titlePara.textContent = `${book.title}`;
        titlePara.classList.add("title");
        bookDiv.appendChild(titlePara);

        const byPara = document.createElement("p");
        byPara.textContent = `by`;
        byPara.classList.add("by");
        bookDiv.appendChild(byPara);

        const authorPara = document.createElement("p");
        authorPara.textContent = `${book.author}`;
        authorPara.classList.add("author");
        bookDiv.appendChild(authorPara);

        const pagesPara = document.createElement("p");
        pagesPara.textContent = `Pages: ${book.pages}`;
        pagesPara.classList.add("pages");
        bookDiv.appendChild(pagesPara);

        const readPara = document.createElement("p");
        readPara.textContent = `Status: ${book.read ? "Read" : "Unread"}`;
        readPara.classList.add("read");
        bookDiv.appendChild(readPara);

        container.appendChild(bookDiv);
    })
}

showForm.addEventListener("click", () => {
    addBook.showModal();
})

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBook.close();
    addBookToLibrary();
    displayBook();
})

// cancelBtn.addEventListener("click", () => {
//     addBook.close();
// })


displayBook();

// make fields mandatory
// reset fields upon adding a book or closing dialogue