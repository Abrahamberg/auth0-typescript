import * as auth0 from "auth0-js";
import { History } from "history";

export default class Auth {
  history: History;
  auth0: auth0.WebAuth;
  userProfile!: auth0.Auth0UserProfile;

  constructor(history: any) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN
        ? process.env.REACT_APP_AUTH0_DOMAIN
        : "",
      clientID: process.env.REACT_APP_AUTH0_CLIENTID
        ? process.env.REACT_APP_AUTH0_CLIENTID
        : "",
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL
        ? process.env.REACT_APP_AUTH0_CALLBACK_URL
        : "",
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
        ? process.env.REACT_APP_AUTH0_AUDIENCE
        : "",
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);

      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = (authResult: auth0.Auth0DecodedHash) => {
    console.log(authResult);
    // set the time that the access token will expire
    if (
      authResult.expiresIn !== undefined &&
      authResult.accessToken !== undefined &&
      authResult.idToken !== undefined
    ) {
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
    }
  };

  isAuthenticated() {
    const exAt = localStorage.getItem("expires_at");
    if (exAt !== undefined && exAt !== null) {
      const expiresAt = JSON.parse(exAt);
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // this.history.push("/");  Soft
    //Log out from Auth0 server
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: "http://localhost:3000"
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = (
    cb: (statusCode: auth0.Auth0UserProfile | null, err: string | null) => void
  ) => {
    if (this.userProfile) return cb(this.userProfile, "");
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, "");
    });
  };
}
