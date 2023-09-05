const showForm = document.getElementById("showForm");
const addBook = document.getElementById("addBook");
const addBookForm = document.getElementById("addBookForm");
const addAuthor = document.getElementById("addAuthor");
const addTitle = document.getElementById("addTitle");
const addPageNum = document.getElementById("addPageNum");
const addReadStatus = document.getElementById("addReadStatus");
const formInputs = [addAuthor, addTitle, addPageNum];
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
    let counter = 1;
    const container = document.getElementById("book-container");
    container.innerHTML = "";
    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute('data-book', counter);

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid");
        trashIcon.classList.add("fa-trash");
        bookDiv.appendChild(trashIcon);

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

        counter++;

        // toggle class for styling
        const bookIndex = readPara.parentElement.dataset.book - 1;
        readPara.classList.toggle("readTrue", myLibrary[bookIndex].read)
   
        // remove book from array when trash icon is clicked
        trashIcon.addEventListener("click", () => {
            let index = myLibrary.indexOf(trashIcon.parentElement.dataset.book);
            myLibrary.splice(index, 1);
            displayBook();
        })

        // toggle read status when clicked
        readPara.addEventListener("click", () => {
            myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
            displayBook();
        })
    })
}

showForm.addEventListener("click", () => {
    addBookForm.reset();
    addBook.showModal();
})

confirmBtn.addEventListener("click", (event) => {
    addValidation();
    if (addAuthor.validity.valid &&
        addTitle.validity.valid &&
        addPageNum.validity.valid) {
        event.preventDefault();
        addBook.close();
        addBookToLibrary();
        displayBook();
    }
})

cancelBtn.addEventListener("click", () => {
    removeValidation();
    addBook.close();
    addBookForm.reset();
})

function addValidation() {
    formInputs.forEach((input) => input.required = true);
}

function removeValidation() {
    formInputs.forEach((input) => input.required = false);
}

displayBook();