import * as React from "react";
import Auth from "./Auth/Auth";
import * as auth0 from "auth0-js";

export interface IProfileProps {
  auth: Auth;
}
export interface IState {
  profile: auth0.Auth0UserProfile | null;
  error?: string | null;
}
export default class Profile extends React.Component<IProfileProps, IState> {
  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      profile: null,
      error: ""
    };
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    this.props.auth.getProfile((p, e) =>
      this.setState({ profile: p, error: e })
    );
  };

  public render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <h1>Profile</h1>
        <p>{profile.nickname}</p>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic"
        />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </>
    );
  }
}
