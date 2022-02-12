import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeAPI } from '../actions';
import ExpenseRecord from '../components/ExpenseRecord';
import TableOfExpenses from '../components/TableOfExpenses';
import TotalExpenseHeader from '../components/TotalExpenseHeader';

class Wallet extends React.Component {
  render() {
    const { userEmail, fetchAPI } = this.props;
    window.onload = fetchAPI();
    return (
      <main>
        <TotalExpenseHeader userEmail={ userEmail } />
        <br />
        <br />
        <ExpenseRecord />
        <hr />
        <TableOfExpenses />
      </main>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  userEmail: reduxState.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAwesomeAPI()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
  fetchAPI: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  userEmail: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
