import { USER_EMAIL } from '../reducers/user';

export const COINS = 'COINS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveUserEmailInReduxStore = (email) => ({
  type: USER_EMAIL,
  email,
});

const saveCurrencyInStoreRedux = (data) => {
  const coinList = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
  const dataKeys = Object.keys(data);
  const dataFormatted = [];
  dataKeys.forEach((element) => {
    if (coinList.includes(element)) {
      dataFormatted.push(element);
    }
  });
  // console.log('saveCurrencyInStoreRedux() --> DATA: ', dataFormatted);
  return {
    type: COINS,
    data: dataFormatted,
  }
}

export const fetchAwesomeAPI = () => {
  // console.log('chamou fetchAwesomeAPI');
  return (dispatch) => {
    // console.log('camou return-dispatch')
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((resonse) => resonse.json())
      .then((data) => dispatch(saveCurrencyInStoreRedux(data)))
      .catch((error) => error);
  }
}

export const saveExpenseInRedux = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expenses, idExpense) => {
  const filteredExpenses = expenses.filter((expenseObject) => expenseObject.id !== idExpense);
  return {
    type: DELETE_EXPENSE,
    filteredExpenses,
  }
};
