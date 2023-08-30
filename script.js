const myLibrary = [
    new Book("Assassin's Apprentice", "Robin Hobb", 392, "read"),
    new Book("The Eye of the World", "Robert Jordan", 685, "read"),
    new Book("The Way of Kings", "Brandon Sanderson", 1007, "unread")
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



    // const booksUl = document.getElementById('books');
    // for (let i = 0; i < myLibrary.length; i++) {
    //     let newLiEl = document.createElement("li");
    //     booksUl.appendChild(newLiEl);
    // };

}

displayBook();