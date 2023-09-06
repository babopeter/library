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

        const container = document.getElementById("book-container");
        container.innerHTML = "";

        this.bookCase.forEach((book, index) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.dataset.book = index + 1;

            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash");
            trashIcon.addEventListener("click", () => this.removeBook(index));
            bookDiv.appendChild(trashIcon);

            const createPara = (textContent, className) => {
                const para = document.createElement("p");
                para.textContent = textContent;
                para.classList.add(className);
                return para;
            };

            const titlePara = createPara(book.title, "title");
            const byPara = createPara("by", "by");
            const authorPara = createPara(book.author, "author");
            const pagesPara = createPara(`Pages: ${book.pages}`, "pages");
            const readPara = createPara(`Status: ${book.read ? "Read" : "Unread"}`, "read");

            bookDiv.appendChild(titlePara);
            bookDiv.appendChild(byPara);
            bookDiv.appendChild(authorPara);
            bookDiv.appendChild(pagesPara);
            bookDiv.appendChild(readPara);
            container.appendChild(bookDiv);

            readPara.classList.toggle("readTrue", book.read);
            readPara.addEventListener("click", () => this.toggleReadStatus(index));
        })
    },

    removeBook: function (index) {
        this.bookCase.splice(index, 1);
        this.displayBook();
    },

    toggleReadStatus: function (index) {
        this.bookCase[index].read = !this.bookCase[index].read;
        this.displayBook();
    },

    addBookToLibrary: function () {
        let book = new Book(
            this.addTitle.value,
            this.addAuthor.value,
            this.addPageNum.value,
            this.addReadStatus.value === "true"
        )
        this.bookCase.push(book);
    },

    addValidation: function () {
        this.formInputs.forEach((input) => input.required = true);
    },

    removeValidation: function () {
        this.formInputs.forEach((input) => input.required = false);
    }
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

myLibrary.showForm.addEventListener("click", () => {
    myLibrary.addBookForm.reset();
    myLibrary.addBook.showModal();
})

myLibrary.confirmBtn.addEventListener("click", (event) => {
    myLibrary.addValidation();
    if (myLibrary.addAuthor.validity.valid &&
        myLibrary.addTitle.validity.valid &&
        myLibrary.addPageNum.validity.valid) {
        event.preventDefault();
        myLibrary.addBook.close();
        myLibrary.addBookToLibrary();
        myLibrary.displayBook();
    }
})

myLibrary.cancelBtn.addEventListener("click", () => {
    myLibrary.removeValidation();
    myLibrary.addBook.close();
    myLibrary.addBookForm.reset();
})

myLibrary.displayBook();