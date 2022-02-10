import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpensesToTheTotal = () => {
    const {
      expensesRedux,
    } = this.props;

    let totalExpensesInBRL = 0;
    expensesRedux.map((objectElement) => {
      const { value, currency, exchangeRates } = objectElement;
      // console.log('------------------------------------------------');
      // console.log('Valor: ', value);
      // console.log('Moeda: ', currency);
      // console.log(`Valor em BRL: `, Number(exchangeRates[currency].ask) * value);
      const quoteInBRL = Number(exchangeRates[currency].ask);
      totalExpensesInBRL += value * quoteInBRL;
      return '';
    });
    return totalExpensesInBRL;
  }

  render() {
    const { userEmail }= this.props;
    const totalInBRL = this.sumExpensesToTheTotal();
    const totalFormatted = Math.round(totalInBRL * 100) / 100;
    
    return (
      <header>
        Email:
        <span data-testid="email-field">{` ${userEmail}`}</span>
        <div>
          Despesa Total: R$
          <span data-testid="total-field">{` ${totalFormatted} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  expensesRedux: reduxStore.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);