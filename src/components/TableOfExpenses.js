import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableOfExpenses extends Component {
  convertAndFormatExpenses = (objectElement) => {
    const { deleteExpense, expensesRedux } = this.props;
    const { description, tag, method, value, currency, exchangeRates, id } = objectElement;
    const conversion = value * Number(exchangeRates[currency].ask);
    const convertedValueInBRL = Math.round(conversion * 100) / 100;
    // console.log('BRL: ', conversion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    // expensesRedux.map((objectElement) => {
      
    //   // console.log('------------------------------------------------');
    //   // console.log('Valor: ', value);
    //   // console.log('Moeda: ', currency);
    //   // console.log(`Valor em BRL: `, Number(exchangeRates[currency].ask) * value);
    //   totalExpensesInBRL += value * quoteInBRL;
    //   return '';
    // });
    // return totalExpensesInBRL;
    return (
      <tr
        key={`${value} ${currency} - ${tag} - ${convertedValueInBRL} BRL`}
        className="tr-expense"
      >
        <td className="td-expense">{description}</td>
        <td className="td-expense">{tag}</td>
        <td className="td-expense">{method}</td>
        <td className="td-expense">{Number(value).toFixed(2)}</td>
        <td className="td-expense">
          {exchangeRates[currency].name.replace("/Real Brasileiro", "")}
        </td>
        <td className="td-expense">
          {/* <span>R$ </span> */}
          {Math.round(Number(exchangeRates[currency].ask) * 100) / 100}
        </td>
        <td className="td-expense">
          {/* <span>R$ </span> */}
          {convertedValueInBRL}
        </td>
        <td className="td-expense">Real</td>
        <td className="td-expense">
          <button
            type="button"
            onClick={() => deleteExpense(expensesRedux, id)}
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
            <tr >
              <th className='th-expense-table'>Descrição</th>
              <th className='th-expense-table' id="tag-expense-table">Tag</th>
              <th className='th-expense-table'>Método de pagamento</th>
              <th className='th-expense-table' id="value-expense-table">Valor</th>
              <th className='th-expense-table'>Moeda</th>
              <th className='th-expense-table'>Câmbio utilizado</th>
              <th className='th-expense-table'>Valor convertido</th>
              <th className='th-expense-table'>Moeda de conversão</th>
              <th className='th-expense-table'>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expensesRedux.map((objectElement) => {
                return this.convertAndFormatExpenses(objectElement);
              })
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
  deleteExpense: (expenses, idExpense) => dispatch(deleteExpense(expenses, idExpense))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableOfExpenses);
