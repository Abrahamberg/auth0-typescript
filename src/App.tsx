import * as React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";

export interface IAppProps {
  history: any;
}

export default class App extends React.Component<IAppProps, any> {
  auth: Auth;

  constructor(props: IAppProps) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav />
        <div className="body">
          {/* Pass props to to the component */}
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            exact
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route path="/profile" exact component={Profile} />
        </div>
      </>
    );
  }
}
