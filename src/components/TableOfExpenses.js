import React, { Component } from 'react';

class TableOfExpenses extends Component {
  render() {
    return (
      <section>
        <table>
          <thead>
            <tr className="tr-expense-table">
              <th className='th-expense-table'>Descrição</th>
              <th className='th-expense-table'>Tag</th>
              <th className='th-expense-table'>Método de pagamento</th>
              <th className='th-expense-table'>Valor</th>
              <th className='th-expense-table'>Moeda</th>
              <th className='th-expense-table'>Câmbio utilizado</th>
              <th className='th-expense-table'>Valor convertido</th>
              <th className='th-expense-table'>Moeda de conversão</th>
              <th className='th-expense-table'>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </section>
    );
  }
}

export default TableOfExpenses;
