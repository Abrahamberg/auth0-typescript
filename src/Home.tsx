import * as React from "react";
import Auth from "./Auth/Auth";
import { Link } from "react-router-dom";

export interface IHomeProps {
  auth: Auth;
}

export default class Home extends React.Component<IHomeProps, any> {
  public render() {
    //const {isAuthenticated,Login} = this.props.auth;
    return (
      <div>
        <h1> Home</h1>
        {this.props.auth.isAuthenticated() ? (
          <Link to="/profile">Viwe Profile</Link>
        ) : (
          <button onClick={this.props.auth.login}>Login</button>
        )}
      </div>
    );
  }
}
