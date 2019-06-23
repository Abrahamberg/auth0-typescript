import * as React from "react";
import Auth from "./Auth/Auth";

export interface ICallbackProps {
  auth: Auth;
  location: any;
}

export default class Callback extends React.Component<ICallbackProps, any> {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }
  public render() {
    return <h1>Loadin ...</h1>;
  }
}
