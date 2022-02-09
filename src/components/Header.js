import React, { Component } from "react";

class Header extends Component {
  render() {
    const { userEmail }= this.props;
    const total = 0;
    const totalFormatted = total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return (
      <header>
        Email:
        <span data-testid="email-field">{` ${userEmail}`}</span>
        <div>
          Despesa Total:
          <span data-testid="total-field">{` ${totalFormatted} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

export default Header;