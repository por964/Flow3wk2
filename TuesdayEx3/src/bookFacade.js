import { v1 as uuid } from 'uuid';

function bookFacade() {
    let books = [
        { id: uuid(), title: "How to Learn JavaScript - Vol 1", info: "Study hard" },
        { id: uuid(), title: "How to Learn ES6", info: "Complete all exercises :-)" },
        { id: uuid(), title: "How to Learn React", info: "Complete all your CA's" },
        { id: uuid(), title: "Learn React", info: "Don't drink beer(s), until Friday (after four)" }
    ]
    const getBooks = () => { return books }
    const findBook = (id) => {
        const bookId = isNaN(id) ? id : Number(id);
        return books.find(book => book.id === bookId)
    }
    const deleteBook = (id) => {
        const bookId = isNaN(id) ? Number(id) : id;
        books = books.filter(book => book.id !== bookId)
    }
    const addBook = (book) => {
        book.id = uuid();
        books.push(book)
    }

    return {
        // Remember all statements below are a shortcut for this version: getBooks: getBooks
        getBooks,
        findBook,
        deleteBook,
        addBook,
    }
}

let returnVal = bookFacade()
export default returnVal;