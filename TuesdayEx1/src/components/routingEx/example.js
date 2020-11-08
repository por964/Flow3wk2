import React from "react";
import './style2.css';
import MultiWelcome from './file3.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

const Content = () => {
    return (
        <div className="content">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/exercise">
                    <MultiWelcome />
                </Route>
            </Switch>
        </div>

    )
}

const Header = () => {
    return (
        <>
            <ul className='header'>
                <li>
                    <NavLink exact activeClassName="selected" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="selected" to="/about/">About</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to="/exercise">Exercise</NavLink>
                </li>
            </ul>

            <hr />

        </>
    )
}

export default function BasicExample() {
    return (
        <Router>
            <div>
                <Header />
                <Content />
                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}
