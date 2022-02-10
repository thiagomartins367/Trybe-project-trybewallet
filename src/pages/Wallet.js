import React from 'react';
import { connect } from 'react-redux';
import { fetchAwesomeAPI } from '../actions';
import ExpenseRecord from '../components/ExpenseRecord';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { userEmail, fetchAPI } = this.props;
    window.onload = fetchAPI();
    return (
      <main>
        <Header userEmail={ userEmail }/>
        <br />
        <br />
        <ExpenseRecord />
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
