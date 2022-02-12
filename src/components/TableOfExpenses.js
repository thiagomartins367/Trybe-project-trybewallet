import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, saveIdOfExpenseToBeEdited } from '../actions';

class TableOfExpenses extends Component {
  convertAndFormatExpenses = (objectElement) => {
    const {
      deleteExpenseRedux,
      expensesRedux,
      saveIdOfExpenseToBeEditedRedux,
    } = this.props;
    const {
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
      id,
    } = objectElement;
    const conversion = value * Number(exchangeRates[currency].ask);
    const convertedValueInBRL = Math.round(conversion * 100) / 100;
    return (
      <tr
        key={ `${value} ${currency} - ${tag} - ${convertedValueInBRL} BRL` }
        className="tr-expense"
      >
        <td className="td-expense">{description}</td>
        <td className="td-expense">{tag}</td>
        <td className="td-expense">{method}</td>
        <td className="td-expense">{Number(value).toFixed(2)}</td>
        <td className="td-expense">
          {exchangeRates[currency].name.replace('/Real Brasileiro', '')}
        </td>
        <td className="td-expense">
          {(Math.round(Number(exchangeRates[currency].ask) * 100) / 100).toFixed(2)}
        </td>
        <td className="td-expense">
          {convertedValueInBRL}
        </td>
        <td className="td-expense">Real</td>
        <td className="td-expense">
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => {
              saveIdOfExpenseToBeEditedRedux(id);
              localStorage.setItem(
                'execute_Function',
                'renderSelectedExpenseInformation',
              );
            } }
          >
            Editar
          </button>
          <button
            type="button"
            onClick={ () => deleteExpenseRedux(expensesRedux, id) }
            data-testid="delete-btn"
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expensesRedux } = this.props;
    return (
      <section className="section-expense-table">
        <table>
          <thead>
            <tr>
              <th className="th-expense-table">Descrição</th>
              <th className="tag-expense-table">Tag</th>
              <th className="th-expense-table">Método de pagamento</th>
              <th className="value-expense-table">Valor</th>
              <th className="th-expense-table">Moeda</th>
              <th className="th-expense-table">Câmbio utilizado</th>
              <th className="th-expense-table">Valor convertido</th>
              <th className="th-expense-table">Moeda de conversão</th>
              <th className="th-expense-table">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expensesRedux.map(
                (objectElement) => this.convertAndFormatExpenses(objectElement),
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  expensesRedux: reduxStore.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseRedux:
    (expenses, idExpense) => dispatch(deleteExpense(expenses, idExpense)),
  saveIdOfExpenseToBeEditedRedux:
    (idExpense) => dispatch(saveIdOfExpenseToBeEdited(idExpense)),
});

TableOfExpenses.propTypes = {
  deleteExpenseRedux: PropTypes.func.isRequired,
  expensesRedux: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  saveIdOfExpenseToBeEditedRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOfExpenses);
