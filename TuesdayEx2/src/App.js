import './App.css';
import React from "react";
import info from './index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

export default function NestingExample(props) {

  const info4 = props.info;
  console.log(info4);

  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/topics">
            <Topics props={info4} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics(props) {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  const info5 = [
  { id: "rendering", title: "Rendering with React", info: "Add some text here" },
  { id: "components", title: "components", info: "Add some text here" },
  { id: "props-v-state", title: "Propans v. State", info: "Add some text here" },
  { id: "lorte-opgave", title: "Props how", info: "Add some text here" }
]

  //const info2 = props.info;
  //console.log(info2);

  console.log(props.info);

  const linkList = info5.map((inf) => {
      return (
      <li key={inf.id}>
        <Link to={`${url}/${inf.id}`}>{inf.title}</Link>
      </li>
      );
    }
  );

  console.log(linkList);

  return (
    <div>
      <h2>Topics</h2>
      <ul>{linkList}</ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:infId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
