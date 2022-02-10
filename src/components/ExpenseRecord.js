import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveExpenseInRedux } from '../actions';
import LabelAndInput from './LabelAndInput';
import LabelAndSelect from './LabelAndSelect';

class ExpenseRecord extends Component {
  constructor () {
    super();

    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {}
    }
  }

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    // console.log(value)
  }

  saveUsedCurrencyQuote = async () => {
    const { saveExpenseInRedux, expensesRedux, currencyOptions } = this.props;
    const expenseIds = [];
    // console.log('expensesRedux: ', expensesRedux);
    if (expensesRedux.length > 0) {
      expensesRedux.map((objectElement) => {
        // console.log('typeof: ', typeof objectElement.id);
        expenseIds.push(objectElement.id);
        return '';
      });
      const biggestId = Math.max(...expenseIds);
      this.setState({ id: biggestId + 1 });
    } else {
      this.setState({ id: 0 });
    }
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const quoteData = await response.json();
      this.setState({ exchangeRates: quoteData }, () => {
        // console.log('quoteData SAVED: ', quoteData);
        saveExpenseInRedux(this.state);
        this.setState({
          id: '',
          value: '',
          description: '',
          currency: currencyOptions[0],
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: {}
        });
      });
    } catch (error) {
      console.log('---> *API REQUEST ERROR*\n \n', error);
      // window.alert('API REQUEST ERROR, Look at browser console');
    }
  }

  render() {
    const { currencyOptions } = this.props;
    const { value, description } = this.state;
    // console.log('currencyOptions1: ', currencyOptions);
    const event = {
      target: {
        name: 'currency',
        value: currencyOptions[0],
      }
    }
    window.onload = () => this.handlerInput(event);
    return (
      <section>
        <form>
          <LabelAndInput
            labelContent="Valor: "
            typeInput="number"
            inputId="value-input-expense"
            inputContent={ value }
            onChangeEvent={ this.handlerInput }
            nameInput="value"
            inputDataTestid="value-input"
          />
          <LabelAndInput
            labelContent="Descrição: "
            typeInput="text"
            inputId="description-input-expense"
            inputContent={ description }
            onChangeEvent={ this.handlerInput }
            nameInput="description"
            inputDataTestid="description-input"
          />
          <LabelAndSelect
            labelContent="Moeda: "
            selectId="currency-input"
            selectDataTestid="currency-input"
            optionsContent={ currencyOptions }
            onChangeEvent={ this.handlerInput }
            nameSelect="currency"
            optionsDataTestId={ true }
          />
          <LabelAndSelect
            labelContent="Método de Pagamento: "
            selectId="method-input"
            selectDataTestid="method-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="method"
            optionsContent={['Dinheiro', 'Cartão de crédito', 'Cartão de débito']}
          />
          <LabelAndSelect
            labelContent="Categoria: "
            selectId="tag-input"
            selectDataTestid="tag-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="tag"
            optionsContent={['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']}
          />
        </form>
        <br />
        <button type="button" onClick={ this.saveUsedCurrencyQuote }>Adicionar Despesa</button>
      </section>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  currencyOptions: reduxStore.wallet.currencies,
  expensesRedux: reduxStore.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenseInRedux: (componentState) => dispatch(saveExpenseInRedux(componentState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRecord);