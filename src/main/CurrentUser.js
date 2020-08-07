import UserAccount from "UserAccount.js";

class CurrentUser {
  #username;
  #password;
  #token;
  #userArray = [];

  constructor(username, password) {
    this.#username = username;
    this.#password = password;
  }

  addAccount(bankname, cardname) {
    var userAccount = new UserAccount(bankname, cardname);

    this.#userArray.push(userAccount);
  }

  getToken() {
    return this.#token;
  }

  setToken(token) {
    this.#token = token;
  }

  getUsername() {
    return this.#username;
  }

  getPassword() {
    return this.#password;
  }
}
