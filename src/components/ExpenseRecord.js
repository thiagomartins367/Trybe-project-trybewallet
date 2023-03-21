import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, saveExpenseInRedux } from '../actions';
import LabelAndInput from './LabelAndInput';
import LabelAndSelect from './LabelAndSelect';

const Alimentacao = 'Alimentação';
class ExpenseRecord extends Component {
  constructor() {
    super();

    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: Alimentacao,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const currencyOptionsString = `${localStorage.getItem('COINS')},`;
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
    const event = {
      target: {
        name: 'currency',
        value: currencyOptions[0],
      },
    };
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
  }

  saveUsedCurrencyQuote = async () => {
    const { actionSaveExpenseInRedux, expensesRedux, currencyOptions } = this.props;
    const expenseIds = [];
    if (expensesRedux.length > 0) {
      expensesRedux.map((objectElement) => {
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
        actionSaveExpenseInRedux(this.state);
        this.setState({
          id: '',
          value: '',
          description: '',
          currency: currencyOptions[0],
          method: 'Dinheiro',
          tag: Alimentacao,
          exchangeRates: {},
        });
      });
    } catch (error) {
      console.log('---> *API REQUEST ERROR*\n \n', error);
    }
  }

  renderSelectedExpenseInformation = () => {
    const { expensesRedux, editExpenseId } = this.props;
    if (editExpenseId >= 0) {
      expensesRedux.map((objectExpense) => {
        if (objectExpense.id === editExpenseId) {
          const keysExpense = Object.keys(objectExpense);
          // console.log('keys: ', keys);
          keysExpense.map((key) => {
            this.setState({ [key]: objectExpense[key] });
            return '';
          });
        }
        return '';
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
      tag: Alimentacao,
      exchangeRates: {},
    });
  }

  render() {
    const {
      currencyOptions,
      expensesRedux,
      editExpenseId,
      editExpenseRedux,
    } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
            optionsDataTestId
          />
          <LabelAndSelect
            labelContent="Método de Pagamento: "
            selectId="method-input"
            selectDataTestid="method-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="method"
            selectContent={ method }
            optionsContent={ [
              'Dinheiro',
              'Cartão de crédito',
              'Cartão de débito',
            ] }
          />
          <LabelAndSelect
            labelContent="Categoria: "
            selectId="tag-input"
            selectDataTestid="tag-input"
            onChangeEvent={ this.handlerInput }
            nameSelect="tag"
            selectContent={ tag }
            optionsContent={ [
              Alimentacao,
              'Lazer',
              'Trabalho',
              'Transporte',
              'Saúde',
            ] }
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
  actionSaveExpenseInRedux:
    (componentState) => dispatch(saveExpenseInRedux(componentState)),
  editExpenseRedux:
    (expensesRedux, componentState) => dispatch(
      editExpense(expensesRedux, componentState),
    ),
});

ExpenseRecord.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  expensesRedux: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.string),
  })).isRequired,
  editExpenseId: PropTypes.number.isRequired,
  editExpenseRedux: PropTypes.func.isRequired,
  actionSaveExpenseInRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRecord);
