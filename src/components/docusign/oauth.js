

const oAuthServiceProviderProd = "https://account.docusign.com"; // prod
const oAuthServiceProviderDemo = "https://account-d.docusign.com";
const oAuthServiceProviderStage = "https://account-s.docusign.com";
export const oAuthServiceProvider = oAuthServiceProviderDemo; // prod
const implicitGrantPath = "/oauth/auth";
export const userInfoPath = "/oauth/userinfo";

const oAuthClientID = process.env.REACT_APP_DS_INTENGRATION_KEY;
const oAuthScopes = "signature cors";
const eSignBase = "/restapi/v2.1";
const oAuthReturnUrl =
  "https://docusign.github.io/jsfiddleImplicitGrantReturn.html"
const logLevel = 9; // 0 is terse; 9 is verbose


export class ImplicitGrant {
  constructor(args) {
    this.oAuthServiceProvider = oAuthServiceProvider;
    this.implicitGrantPath = implicitGrantPath;
    this.oAuthClientID = oAuthClientID;
    this.oAuthScopes = oAuthScopes;
    this.oAuthReturnUrl = oAuthReturnUrl;
    this.workingUpdateF = args.workingUpdateF || null;

    // public variables
    this.working = false;
    this.accessToken = null;
    this.accessTokenExpires = null;
    this.errMsg = null;

    // internal
    this._loginWindow = null;
    this._nonce = null;
  }

  /*
   * Start the login process in a new browser tab
   */
  async login() {
    this.working = true;
    this.errMsg = null;
    if (this.workingUpdateF) {
        this.workingUpdateF(this.working);
    }

    // Get a random nonce to use with OAuth call
    // See https://oauth.net/articles/authentication/#access-token-injection
    // Using https://www.random.org/clients/http/
    this._nonce = Date.now(); // default nounce
    this._nonce = (await this.randomNounce()) || this._nonce;
    const url =
        `${this.oAuthServiceProvider}${this.implicitGrantPath}` +
        `?response_type=token` +
        `&scope=${this.oAuthScopes}` +
        `&client_id=${this.oAuthClientID}` +
        `&redirect_uri=${this.oAuthReturnUrl}` +
        `&state=${this._nonce}`;
    this._loginWindow = window.open(url, "oauthPopup", "width=600,height=600"); 
    const newTab = this._loginWindow;
    if (!newTab || newTab.closed || typeof newTab.closed=='undefined') {
        // POPUP BLOCKED
        alert ("Please enable the popup login window. Then reload this page.")
    }
    this._loginWindow.focus();
  }

  /*
     * Obtain a random value from random.org
     */
  async randomNounce() {
    try {
      const url =
        "https://www.random.org/strings/?num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new";
      let results = await fetch(url, {
        mode: "cors",
        headers: new Headers({
          Accept: `text/html`
        })
      });
      if (results && results.ok) {
        // remove the last character, a CR
        return (await results.text()).slice(0, -1);
      }
    } catch (e) { }
    return false;
  }

  /*
   * handleMessage processes the incoming response message
   * from the Authorization Service Provider
   */
  handleMessage(data) {
    if (!data || data.source !== "oauthResponse") {
      return "skip";
    }
    // OAuth response
    if (this._loginWindow) {
      this._loginWindow.close(); // close the browser tab used for OAuth
    }
    const hash = data.hash.substring(1); // remove the #
    const items = hash.split(/\=|\&/);
    let i = 0;
    let response = {};
    while (i + 1 < items.length) {
      response[items[i]] = items[i + 1];
      i += 2;
    }
    const newState = response.state;
    if (newState !== this._nonce) {
      this.errMsg = "Bad state response. Possible attacker!?!";
      this.working = false;
      if (this.workingUpdateF) {
        this.workingUpdateF(this.working);
      }
      return "error";
    }
    this.accessToken = response.access_token;
    this.accessTokenExpires = new Date(
      Date.now() + response.expires_in * 1000
    );
    // done!
    this.working = false;
    if (this.workingUpdateF) {
      this.workingUpdateF(this.working);
    }
    return "ok";
  }

  logout() {
    this.accessToken = null;
    this.accessTokenExpires = null;
  }

  /* Will the access token will expire in the next 15 minutes ? */
  checkToken() {
    const bufferTime = 15 * 60 * 1000;
    const ok =
      this.accessToken &&
      this.accessTokenExpires &&
      Date.now() + bufferTime < this.accessTokenExpires.getTime();
    if (!ok) {
      this.login();
    }
    return ok;
  }

  getAccessToken() {
    return this.accessToken;
  }
}