class Library {
    constructor() {
        this.bookCase = [
            new Book("Assassin's Apprentice", "Robin Hobb", 392, true),
            new Book("The Eye of the World", "Robert Jordan", 685, true),
            new Book("The Way of Kings", "Brandon Sanderson", 1007, false)
        ];

        this.showForm = document.getElementById("showForm");
        this.addBook = document.getElementById("addBook");
        this.addBookForm = document.getElementById("addBookForm");
        this.addAuthor = document.getElementById("addAuthor");
        this.addTitle = document.getElementById("addTitle");
        this.addPageNum = document.getElementById("addPageNum");
        this.addReadStatus = document.getElementById("addReadStatus");
        this.formInputs = [this.addAuthor, this.addTitle, this.addPageNum];
        this.confirmBtn = document.getElementById("confirmBtn");
        this.cancelBtn = document.getElementById("cancelBtn");
    }

    displayBook() {
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
    }

    removeBook(index) {
        this.bookCase.splice(index, 1);
        this.displayBook();
    }

    toggleReadStatus(index) {
        this.bookCase[index].read = !this.bookCase[index].read;
        this.displayBook();
    }

    addBookToLibrary() {
        let book = new Book(
            this.addTitle.value,
            this.addAuthor.value,
            this.addPageNum.value,
            this.addReadStatus.value === "true"
        )
        this.bookCase.push(book);
    }

    addValidation() {
        this.formInputs.forEach((input) => input.required = true);
    }

    removeValidation() {
        this.formInputs.forEach((input) => input.required = false);
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

let myLibrary = new Library();

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