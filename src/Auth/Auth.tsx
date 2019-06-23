import * as auth0 from "auth0-js";

export default class Auth {
  history: any;
  auth0: auth0.WebAuth;
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
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
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
}
