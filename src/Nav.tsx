import * as React from "react";
import { Link } from "react-router-dom";

export interface IAppProps {}

export default class App extends React.Component<IAppProps, any> {
  public render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
