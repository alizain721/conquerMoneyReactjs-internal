import React, { Component } from 'react'
import {PlaidLink} from 'react-plaid-link'

class Link extends Component {
  handleOnSuccess(token, metadata) {
    // send token to client server
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }
  render() {
    return (
      <PlaidLink
        clientName="ConquerMoney"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="4407487a1d95a71cbbe3d3b5186c9b"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}>
        Open Link and connect your bank!
      </PlaidLink>
    )
  }
}
export default Link