import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeAPI } from '../actions';
import ExpenseRecord from '../components/ExpenseRecord';
import TableOfExpenses from '../components/TableOfExpenses';
import TotalExpenseHeader from '../components/TotalExpenseHeader';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      render: false,
    };
  }

  render() {
    const { userEmail, fetchAPI, currencyOptions } = this.props;
    const { render } = this.state;
    if (currencyOptions.length === 0) {
      fetchAPI().then(() => this.setState({ render: true }));
    }
    return (
      <main>
        { render && (
          <>
            <TotalExpenseHeader userEmail={ userEmail } />
            <br />
            <br />
            <ExpenseRecord />
            <hr />
            <TableOfExpenses />
          </>
        ) }
      </main>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  userEmail: reduxState.user.email,
  currencyOptions: reduxState.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAwesomeAPI()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
  fetchAPI: PropTypes.func.isRequired,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
};

Wallet.defaultProps = {
  userEmail: '',
  currencyOptions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
