const myLibrary = {
    bookCase: [
        new Book("Assassin's Apprentice", "Robin Hobb", 392, true),
        new Book("The Eye of the World", "Robert Jordan", 685, true),
        new Book("The Way of Kings", "Brandon Sanderson", 1007, false)
    ],

    showForm: document.getElementById("showForm"),
    addBook: document.getElementById("addBook"),
    addBookForm: document.getElementById("addBookForm"),
    addAuthor: document.getElementById("addAuthor"),
    addTitle: document.getElementById("addTitle"),
    addPageNum: document.getElementById("addPageNum"),
    addReadStatus: document.getElementById("addReadStatus"),
    formInputs: [addAuthor, addTitle, addPageNum],
    confirmBtn: document.getElementById("confirmBtn"),
    cancelBtn: document.getElementById("cancelBtn"),

    displayBook: function () {
        let counter = 1;
        const container = document.getElementById("book-container");
        container.innerHTML = "";
        this.bookCase.forEach(book => {
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
            readPara.classList.toggle("readTrue", this.bookCase[bookIndex].read)

            // remove book from array when trash icon is clicked
            trashIcon.addEventListener("click", () => {
                let index = this.bookCase.indexOf(trashIcon.parentElement.dataset.book);
                this.bookCase.splice(index, 1);
                this.displayBook();
            })

            // toggle read status when clicked
            readPara.addEventListener("click", () => {
                this.bookCase[bookIndex].read = !this.bookCase[bookIndex].read;
                this.displayBook();
            })
        })
    }
}


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    let book = new Book(
        myLibrary.addTitle.value,
        myLibrary.addAuthor.value,
        myLibrary.addPageNum.value,
        myLibrary.addReadStatus.value === "true"
    )
    myLibrary.bookCase.push(book);
    console.log(`${myLibrary.addReadStatus.value}`);
}

myLibrary.showForm.addEventListener("click", () => {
    myLibrary.addBookForm.reset();
    myLibrary.addBook.showModal();
})

myLibrary.confirmBtn.addEventListener("click", (event) => {
    addValidation();
    if (myLibrary.addAuthor.validity.valid &&
        myLibrary.addTitle.validity.valid &&
        myLibrary.addPageNum.validity.valid) {
        event.preventDefault();
        myLibrary.addBook.close();
        addBookToLibrary();
        myLibrary.displayBook();
    }
})

myLibrary.cancelBtn.addEventListener("click", () => {
    removeValidation();
    myLibrary.addBook.close();
    myLibrary.addBookForm.reset();
})

function addValidation() {
    myLibrary.formInputs.forEach((input) => input.required = true);
}

function removeValidation() {
    myLibrary.formInputs.forEach((input) => input.required = false);
}

myLibrary.displayBook();