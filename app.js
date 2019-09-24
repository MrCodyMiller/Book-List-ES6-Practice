



//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI() { }

UI.prototype.addBookToList = (book) => {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`


    list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = (message, className) => {
const div = document.createElement('div');

//Add Classes
div.className = `alert ${className}`;
//Add Text
div.appendChild(document.createTextNode(message));
// Get Parent
const container = document.querySelector('.container');
// Get Form
const form = document.querySelector('#book-form')
// Insert Alert
container.insertBefore(div, form);

setTimeout(() => {
    document.querySelector('.alert').remove();
}, 3000);

}


//Delete Book
UI.prototype.deleteBook = (target) => {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear Fields
UI.prototype.clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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

    // Show Success
    ui.showAlert('Book Added!', 'success');

    //Clear fields after submit
    ui.clearFields();
    }



    e.preventDefault();
});


// Even Listener for Delete

document.getElementById('book-list').addEventListener('click', (e) =>{
    const ui = new UI();

    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book Removed', 'success');




    e.preventDefault();
})
