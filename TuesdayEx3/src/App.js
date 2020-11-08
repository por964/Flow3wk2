import './App.css';
import React, { useState } from "react";
import bookFacade from './bookFacade';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
  Link,
  useHistory
} from "react-router-dom";

function App(props) {


  const [isLoggedIn, setisLoggedIn] = useState(false);

  let history = useHistory();

  const setLoginStatus = status => {
    setisLoggedIn(status);
    history.push("/");
  }
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? 'Logout' : 'Login'}
        isLoggedin={isLoggedIn}
      />
      <p></p>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={props.bookFacade} />
          <Details bookFacade={props.bookFacade} />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={props.bookFacade} />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={props.bookFacade} />
        </Route>
        <Route path='/login-out'>
          <Login
            loginMsg={isLoggedIn ? 'Logout' : 'Login'}
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>


  );
}


function Header({ isLoggedin, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      {isLoggedin && (
        <React.Fragment>
          <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
          <li><NavLink activeClassName="active" to="/find-book">Find book</NavLink></li>
        </React.Fragment>
      )}
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
      <li><NavLink activeClassName="active" to="/login-out"> {loginMsg} </NavLink></li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function Login({ isLoggedIn, loginMsg, setLoginStatus }) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  }
  return (
    <div>
      <h2>{loginMsg}</h2>
      <em>This simulates a real login page, here u just need to press the button</em>
      <em>In a real app, you will need credentials</em>
      <br />
      <button onClick={handleBtnClick} > {loginMsg} </button>
    </div>
  )
}

function Products(props) {
  const books = props.bookFacade.getBooks();

  let { path, url } = useRouteMatch();

  const lis = books.map(book => {
    return (
      <li key={book.id}>
        {book.title}
          &nbsp;
        <Link to={`${url}/${book.id}`}>details</Link>
      </li>
    );
  });
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {lis}
      </ul>
      <p>--------------------</p>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a book</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade}></Details>
        </Route>
      </Switch>
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h3>
        No match found for this.
      </h3>
    </div>
  );
};

function Details(props) {
  const { bookId } = useParams();
  const book = props.bookFacade.findBook(bookId);

  const showBook = book ? (
    <div>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info} </p>
    </div>
  ) : (
      <p>Book not found</p>
    );
  return (
    <div>
      {showBook}
    </div>
  );
}

function FindBook(props) {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);

  const findBook = () => {
    const foundBook = props.bookFacade.findBook(bookId);
    setBook(foundBook);
  }
  const deleteBook = id => {
    props.bookFacade.deleteBook(id);
    setBook(null);
  }
  return (
    <div style={{ margin: 4 }}>
      <input id='book-id' placeholder='Enter book id' onChange={e => { setBookId(e.target.value) }} />
      <button onClick={findBook}>Find book</button>
      {book && (
        <div>
          <p>ID: {book.id} </p>
          <p>Title: {book.title} </p>
          <p>Info: {book.info} </p>
          <div>
            <button onClick={() => deleteBook(book.id)} >Delete book</button>
          </div>
        </div>
      )}
      {!book && <p>Enter id for book you want to view</p>}
    </div>
  )
}

function AddBook(props) {
  const emptyBook = { id: '', title: '', info: '' };

  const [book, setBook] = useState({ ...emptyBook });

  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value })
    setIsBlocking(true);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.bookFacade.addBook(book);
    setBook({ ...emptyBook });
    setIsBlocking(false);
  }
  return (
    <div>
      <h2>Add book</h2>
      <form>
        <input
          id='title' value={book.title} placeholder='Add title' onChange={handleChange} />
        <br />
        <input id='info' value={book.info} placeholder='Add info' onChange={handleChange} />
        <br />
        <button onClick={handleSubmit}>Save </button>
      </form>
      <Prompt
        when={isBlocking}
        message={location =>
          `You have unsaved changes, are u sure u want to go to ${location.pathname}`}
      />
    </div>
  )
}

export default App;
