const myLibrary = [book1, book2, book3];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  
}

const book1 = new Book("Assassin's Apprentice", "Robin Hobb", 
392, "read")

const book2 = new Book("The Eye of the World", "Rober Jordan",
685, "read")

const book3 = new Book("The Way of Kings", "Brandon Sanderson", 
1007, "unread")