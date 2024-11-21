

const oAuthServiceProviderProd = "https://account.docusign.com"; // prod
const oAuthServiceProviderDemo = "https://account-d.docusign.com"; 
const oAuthServiceProviderStage = "https://account-s.docusign.com"; 
let oAuthServiceProvider = oAuthServiceProviderDemo; // prod
const implicitGrantPath = "/oauth/auth";
const userInfoPath = "/oauth/userinfo";

const oAuthClientID = process.env.REACT_APP_DS_INTENGRATION_KEY;
const oAuthScopes = "signature cors";
const eSignBase = "/restapi/v2.1";
const oAuthReturnUrl =
    "http://localhost:3000/rich-crm/docusign"; // This is the URL that DocuSign will redirect to after the user authenticates
const logLevel = 9; // 0 is terse; 9 is verbose


class ImplicitGrant {
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
      this._nonce = Date.now(); // default nonce
      const url =
        `${this.oAuthServiceProvider}${this.implicitGrantPath}` +
        `?response_type=token` +
        `&scope=${this.oAuthScopes}` +
        `&client_id=${this.oAuthClientID}` +
        `&redirect_uri=${this.oAuthReturnUrl}` +
        `&state=${this._nonce}`;
      this._loginWindow = window.open(url, "_blank");
      const newTab = this._loginWindow;
      if (!newTab || newTab.closed || typeof newTab.closed=='undefined') {
          // POPUP BLOCKED
          alert ("Please enable the popup login window.")
      }
      this._loginWindow.focus();
  }
}

export default ImplicitGrant;