import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <main>
        <Header userEmail={ userEmail }/>
        <span>Bem-Vindo a Wallet</span>
      </main>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  userEmail: reduxState.user.email,
})

export default connect(mapStateToProps, null)(Wallet);
