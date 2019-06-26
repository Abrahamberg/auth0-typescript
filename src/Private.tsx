import * as React from "react";
import Auth from "./Auth/Auth";

export interface IPrivateProps {
  auth: Auth;
}

export interface IState {
  message: String;
}

export default class Private extends React.Component<IPrivateProps, IState> {
  constructor(props: IPrivateProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        console.log("fet");
        if (response.ok) return response.json();
        throw new Error("Network response was not ok");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  public render() {
    return <p>{this.state.message}</p>;
  }
}
