import * as React from "react";

export interface IAppProps {}

export interface IState {
  message: String;
}

export default class App extends React.Component<IAppProps, IState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch("/public")
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
