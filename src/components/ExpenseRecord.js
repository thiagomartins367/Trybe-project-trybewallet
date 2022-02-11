import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, saveExpenseInRedux } from '../actions';
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

  componentDidMount() {
    const currencyOptionsString = localStorage.getItem('COINS') + ',';
    const currencyOptions = [];
    let string = '';
    for (let index = 0; index <= string.length; index += 1) {
      if (currencyOptionsString[index] === ',') {
        currencyOptions.push(string);
        string = '';
      } else {
        string += currencyOptionsString[index];
      }
      
    }
    // console.log('localStorage: ', currencyOptions);
    // console.log('currencyOptions TEST:', currencyOptions);
    const event = {
      target: {
        name: 'currency',
        value: currencyOptions[0],
      }
    }
    this.handlerInput(event);
  }

  componentDidUpdate() {
    const executeFunction = localStorage.getItem('execute_Function');
    if (executeFunction === 'renderSelectedExpenseInformation') {
      this.renderSelectedExpenseInformation();
      localStorage.setItem('execute_Function', '');
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
      window.alert('API REQUEST ERROR, Look at browser console');
    }
  }

  renderSelectedExpenseInformation = () => {
    const { expensesRedux, editExpenseId } = this.props;
    // console.log('editExpenseId: ', editExpenseId);
    if (editExpenseId >= 0) {
      // console.log('chamou renderSelectedExpenseInformation');
      expensesRedux.map((objectExpense) => {
        if (objectExpense.id === editExpenseId) {
          const keysExpense = Object.keys(objectExpense);
          // console.log('keys: ', keys);
          keysExpense.map((key) => {
            this.setState({ [key]: objectExpense[key] });
          });
        }
      });
      
    }
  }

  resetStateOfExpenseRecord = () => {
    const { currencyOptions } = this.props;
    this.setState({
      id: '',
      value: '',
      description: '',
      currency: currencyOptions[0],
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {}
    });
  }

  render() {
    const { currencyOptions, expensesRedux, editExpenseId, editExpenseRedux } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // console.log('render: ', currencyOptions);
    // console.log('currencyOptions1: ', currencyOptions);
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
            selectContent={ currency }
            optionsDataTestId={ true }
          />
          <LabelAndSelect
            labelContent="Método de Pagamento: "
            selectId="method-input"
            selectDataTestid="method-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="method"
            selectContent={ method }
            optionsContent={[
              "Dinheiro",
              "Cartão de crédito",
              "Cartão de débito",
            ]}
          />
          <LabelAndSelect
            labelContent="Categoria: "
            selectId="tag-input"
            selectDataTestid="tag-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="tag"
            selectContent={ tag }
            optionsContent={[
              "Alimentação",
              "Lazer",
              "Trabalho",
              "Transporte",
              "Saúde",
            ]}
          />
        </form>
        <br />
        {editExpenseId >= 0 ? (
          <button
            type="button"
            onClick={ () => {
              editExpenseRedux(expensesRedux, this.state);
              this.resetStateOfExpenseRecord();
            } }
          >
            Editar despesa
          </button>
        ) : (
          <button type="button" onClick={ this.saveUsedCurrencyQuote }>
            Adicionar despesa
          </button>
        )}
      </section>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  currencyOptions: reduxStore.wallet.currencies,
  expensesRedux: reduxStore.wallet.expenses,
  editExpenseId: reduxStore.wallet.editExpenseId,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenseInRedux: (componentState) =>
    dispatch(saveExpenseInRedux(componentState)),
  editExpenseRedux: (expensesRedux, componentState) =>
    dispatch(editExpense(expensesRedux, componentState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRecord);