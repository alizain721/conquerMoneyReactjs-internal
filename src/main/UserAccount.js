class UserAccount {
  #bankname;
  #cardname;

  constructor(bankname, cardname) {
    this.#bankname = bankname;
    this.#cardname = cardname;
  }

  getAccountName() {
    return this.#cardname;
  }
}
