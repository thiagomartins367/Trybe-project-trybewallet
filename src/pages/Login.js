import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUserEmailInReduxStore } from '../actions';

const MINIMUM_OF_CHARACTERS = 6;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userPassword: '',
      disabledButton: true,
    };
  }

  handlerInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateEmailAndPasswordFields();
    });
  }

  validateEmailAndPasswordFields = () => {
    const { userEmail, userPassword } = this.state;
    const defaultEmailFormat = /\S+@\S+\.\S+/; // <----- Estas 2 linhas de  código foram retiradas do Artigo:
    const validateEmailFormat = defaultEmailFormat.test(userEmail); // <--- https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex
    if (
      validateEmailFormat === true
      && userPassword.length >= MINIMUM_OF_CHARACTERS
    ) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  // "+": Corresponde ao caractere anterior uma ou mais vezes. Link: https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
  // "\S" Corresponde a qualquer coisa menos um espaço em branco, de acordo com esta referência: http://www.javascriptkit.com/javatutors/redev2.shtml .
  // "\." Serve para indicar que quero literalmente que o caractere "." faça parte do formato padrão e não que
  // faça parte dos quantificadores. Link: https://medium.com/@wilfison/maneira-mais-f%C3%A1cil-de-lembrar-express%C3%B5es-regulares-regex-8a7edfbe669d
  // "@" Indica que quero que o caractere "@" faça parte do formato padrão.

  render() {
    const { userEmail, userPassword, disabledButton } = this.state;
    const { saveUserEmail } = this.props;
    return (
      <section>
        <input
          type="email"
          onChange={ this.handlerInput }
          name="userEmail"
          value={ userEmail }
          placeholder="Email"
          data-testid="email-input"
        />
        <br />
        <input
          type="password"
          onChange={ this.handlerInput }
          name="userPassword"
          value={ userPassword }
          placeholder="Senha"
          data-testid="password-input"
        />
        <br />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabledButton }
            onClick={ () => saveUserEmail(this.state) }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: ({ userEmail }) => dispatch(saveUserEmailInReduxStore(userEmail)),
});

Login.propTypes = {
  saveUserEmail: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login);
