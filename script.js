const addBookBtn = document.querySelector('.add-book-btn');

const placeHolderBook1 = {
    title: 'The way of Kings',
    author: 'Brandon Sanderson',
    pages: 789,
    read: 'yes',
};
const placeHolderBook2 = {
    title: 'Harry Potter',
    author: 'J.K. Rollings',
    pages: 256,
    read: 'no',
};

let myLibrary = [placeHolderBook1, placeHolderBook2];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages}, ${read}`;
    };
}

function addBookToLibrary() {
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
        console.log(book);
        myLibrary.push(book);
        updateLibraryDisplay();
    } else {
        alert('Incorrect response. Enter yes/no.');
        return;
    }
}

function deleteBook(e) {
    const bookCard = e.target.parentNode;
    const bookIndex = e.target.parentNode.getAttribute('data-library-index');
    myLibrary.splice(bookIndex, 1);
    bookCard.remove();
}

function readBook(e) {
    const bookCard = e.target.parentNode;
    const readBtn = e.target;
    bookCard.classList.toggle('read');
    if (readBtn.textContent === 'Read') {
        readBtn.textContent = 'Unread';
        readBtn.style.backgroundColor = 'red';
    } else {
        readBtn.style.backgroundColor = '#04aa6d';
        readBtn.textContent = 'Read';
    }
}

function buildBookDisplayCard(index, bookObj) {
    const wrapper = document.querySelector('.wrapper');
    const newCard = document.createElement('div');
    const newTitle = document.createElement('h3');
    const newAuthor = document.createElement('h4');
    const newPageNum = document.createElement('p');
    const newDeleteBtn = document.createElement('button');
    const newReadBtn = document.createElement('button');

    newCard.setAttribute('data-library-index', `${index}`);
    newCard.classList.add('card');
    newTitle.textContent = bookObj.title;
    newAuthor.textContent = `By: ${bookObj.author}`;
    newPageNum.textContent = `Total pages: ${bookObj.pages}`;
    newReadBtn.textContent = evalIfBookRead(bookObj, newReadBtn);
    if (newReadBtn.textContent === 'Unread') {
        newReadBtn.classList = 'btn did-not-read';
    } else {
        newReadBtn.classList = 'btn';
        newCard.classList.toggle('read');
    }
    newReadBtn.addEventListener('click', readBook);
    newDeleteBtn.textContent = 'Delete Book';
    newDeleteBtn.classList = 'btn delete';
    newDeleteBtn.addEventListener('click', deleteBook);

    wrapper.append(newCard);
    newCard.append(newTitle, newAuthor, newPageNum, newReadBtn, newDeleteBtn);
}

function evalIfBookRead(bookObj, btn) {
    if (bookObj.read === 'yes') {
        return 'Read';
    } else {
        return 'Unread';
    }
}

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        buildBookDisplayCard(i, myLibrary[i]);
    }
}
function updateLibraryDisplay() {
    if (myLibrary.lenght < 1) {
        buildBookDisplayCard(myLibrary.length, myLibrary[myLibrary.length]);
    } else {
        buildBookDisplayCard(myLibrary.length - 1, myLibrary[myLibrary.length - 1]);
    }
}

function openForm() {
    document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('myForm').style.display = 'none';
}

displayLibrary();
addBookBtn.addEventListener('click', addBookToLibrary);
