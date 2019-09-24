



//Book Constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI Constructor
class UI {
    constructor() { }
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr');
        //Insert columns
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }
    //Show Alert
    showAlert(message, className) {
        const div = document.createElement('div');
        //Add Classes
        div.className = `alert ${className}`;
        //Add Text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    //Delete Book
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    //Clear Fields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local Storage Class
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => {
            const ui = new UI;

            //Add Book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) =>{
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//Event Listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
    //Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    //Validate
    if (title === '' || author === '' || isbn === '') {
        //Error Alert
        ui.showAlert('Please fill in all fields', 'error')


    } else {
        //Add Book to list
        ui.addBookToList(book)

        //add to local storage
        Store.addBook(book);

        // Show Success
        ui.showAlert('Book Added!', 'success');

        //Clear fields after submit
        ui.clearFields();
    }



    e.preventDefault();
});


// Even Listener for Delete

document.getElementById('book-list').addEventListener('click', (e) => {
    const ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show message
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
})
