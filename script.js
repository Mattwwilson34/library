class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    checkIfRead() {
        if (this.read === 'yes') {
            return 'Read';
        } else {
            return 'Unread';
        }
    }

    toggleRead() {
        if (this.read === 'yes') {
            this.read = 'no';
        } else {
            this.read = 'yes';
        }
    }
}

const Library = {
    books: [],

    addBookBtn: document.querySelector('.add-book-btn'),

    initLibrary: function () {
        let book1Seed = new Book('The way of Kings', 'Brandon Sanderson', 789, 'yes');
        let book2Seed = new Book('Harry Potter', 'J.K. Rollings', 256, 'no');
        this.books.push(book1Seed, book2Seed);
        this.bindEvents();
    },

    addBookToLibrary: function (book) {
        this.books.push(book);
    },

    removeBookFromLibrary: function (index) {
        this.books.splice(index, 1);
    },

    addBook: function (e) {
        const titleElement = document.getElementById('title');
        const authorElement = document.getElementById('author');
        const pagesElement = document.getElementById('pages');
        const readElement = document.getElementById('read');

        const title = titleElement.value;
        const author = authorElement.value;
        const pages = pagesElement.value;
        const read = readElement.value;

        if (read.toLowerCase() === 'yes' || read.toLowerCase() === 'no') {
            const book = new Book(title, author, pages, read);
            Library.addBookToLibrary(book);
            DisplayController.render(true);
        } else {
            alert('Incorrect response. Enter yes/no.');
            return;
        }
    },

    bindEvents: function () {
        this.addBookBtn.addEventListener('click', this.addBook);
    },
};

const DisplayController = {
    render: function (newBook = false) {
        if (!newBook) {
            Library.books.forEach((book, i) => {
                this.initDisplay(book, i);
            });
        } else {
            const newBook = Library.books[Library.books.length - 1];
            const newBookIndex = Library.books.length - 1;
            this.initDisplay(newBook, newBookIndex);
        }
    },

    initDisplay: function (book, index) {
        this.createBookElements();
        this.setBookCardAttributes(index);
        this.addBookElementText(book);
        this.updateBookElementClasses(book);
        this.appendElements();
        this.bindEvents();
    },

    createBookElements: function () {
        this.wrapper = document.querySelector('.wrapper');
        this.card = document.createElement('div');
        this.title = document.createElement('h3');
        this.author = document.createElement('h4');
        this.pageNum = document.createElement('p');
        this.deleteBtn = document.createElement('button');
        this.readBtn = document.createElement('button');
    },

    setBookCardAttributes: function (index) {
        this.card.setAttribute('data-library-index', `${index}`);
    },

    addBookElementText: function (book) {
        this.title.textContent = book.title;
        this.author.textContent = `By: ${book.author}`;
        this.pageNum.textContent = `Total pages: ${book.pages}`;
        this.readBtn.textContent = book.checkIfRead();
        this.deleteBtn.textContent = 'Delete Book';
    },

    updateBookElementClasses: function (book) {
        this.card.classList.add('card');
        this.deleteBtn.classList = 'btn delete';
        if (book.checkIfRead() === 'Unread') {
            this.readBtn.classList = 'btn did-not-read';
        } else {
            this.readBtn.classList = 'btn read';
            this.card.classList.toggle('read');
        }
    },

    appendElements: function () {
        this.wrapper.append(this.card);
        this.card.append(this.title, this.author, this.pageNum, this.readBtn, this.deleteBtn);
    },

    bindEvents: function () {
        this.readBtn.addEventListener('click', this.readBook);
        this.deleteBtn.addEventListener('click', this.deleteBook);
    },

    readBook: function (e) {
        const bookCard = this.parentNode;
        const bookIndex = bookCard.getAttribute('data-library-index');
        const readBtn = this;
        Library.books[bookIndex].toggleRead();
        bookCard.classList.toggle('read');
        if (readBtn.textContent === 'Read') {
            readBtn.style.backgroundColor = 'red';
            readBtn.style.color = 'white';
            readBtn.textContent = 'Unread';
        } else {
            readBtn.style.backgroundColor = '#04d88b';
            readBtn.style.color = 'black';
            readBtn.textContent = 'Read';
        }
    },

    deleteBook: function (e) {
        const bookCard = this.parentNode;
        const bookIndex = bookCard.getAttribute('data-library-index');
        Library.removeBookFromLibrary(bookIndex);
        bookCard.remove();
    },

    openForm: function () {
        document.getElementById('myForm').style.display = 'block';
    },
    closeForm: function () {
        document.getElementById('myForm').style.display = 'none';
    },

    updateLibraryDisplay: function () {},
};

Library.initLibrary();
DisplayController.render();
