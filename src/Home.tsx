import * as React from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";

export interface IHomeProps {
  auth: Auth;
}

export default class Home extends React.Component<IHomeProps, any> {
  public render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1> Home</h1>
        {isAuthenticated() ? (
          <Link to="/profile">Viwe Profile</Link>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    );
  }
}
