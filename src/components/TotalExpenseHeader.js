import React, { Component } from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { connect } from 'react-redux';

class TotalExpenseHeader extends Component {
  sumExpensesToTheTotal = () => {
    const {
      expensesRedux,
    } = this.props;

    let totalExpensesInBRL = 0;
    expensesRedux.map((objectElement) => {
      const { value, currency, exchangeRates } = objectElement;
      const quoteInBRL = Number(exchangeRates[currency].ask);
      totalExpensesInBRL += value * quoteInBRL;
      return '';
    });
    return totalExpensesInBRL;
  }

  render() {
    const { userEmail } = this.props;
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

TotalExpenseHeader.propTypes = {
  expensesRedux: PropTypes.arrayOf(objectOf(PropTypes.string)).isRequired,
  userEmail: PropTypes.string,
};

TotalExpenseHeader.defaultProps = {
  userEmail: '',
};

export default connect(mapStateToProps, null)(TotalExpenseHeader);
