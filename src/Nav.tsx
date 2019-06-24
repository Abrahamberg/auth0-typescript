import * as React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth/Auth";

export interface IAppProps {
  auth: Auth;
}

export default class App extends React.Component<IAppProps, any> {
  public render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
