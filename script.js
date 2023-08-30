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
    // https://stackoverflow.com/questions/46800576/how-to-create-an-object-with-user-input-javascript
}

function displayBook() {

    const container = document.getElementById("book-container");
    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const titlePara = document.createElement("p");
        titlePara.textContent = `Title: ${book.title}`;
        bookDiv.appendChild(titlePara);

        const authorPara = document.createElement("p");
        authorPara.textContent = `Author: ${book.author}`;
        bookDiv.appendChild(authorPara);

        const pagesPara = document.createElement("p");
        pagesPara.textContent = `Pages: ${book.pages}`;
        bookDiv.appendChild(pagesPara);

        const readPara = document.createElement("p");
        readPara.textContent = `Read: ${book.read ? "Yes" : "No"}`;
        bookDiv.appendChild(readPara);

        container.appendChild(bookDiv);
    })
}

displayBook();