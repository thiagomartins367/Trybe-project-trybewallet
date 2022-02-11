import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LabelAndInput extends Component {
  render() {
    const {
      labelContent,
      inputContent,
      typeInput,
      inputId,
      inputDataTestid,
      onChangeEvent,
      nameInput,
    } = this.props;
    return (
      <div>
        <label htmlFor={ inputId }>{ labelContent }</label>
        <input
          type={ typeInput }
          id={ inputId }
          value={ inputContent }
          name={ nameInput }
          onChange={ onChangeEvent }
          data-testid={ inputDataTestid }
        />
      </div>
    );
  }
}

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputContent: PropTypes.string.isRequired,
  typeInput: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputDataTestid: PropTypes.string,
  onChangeEvent: PropTypes.func,
  nameInput: PropTypes.string.isRequired,
}

LabelAndInput.defaultPropTypes = {
  inputDataTestid: '',
  onChangeEvent: () => '',
}

export default LabelAndInput;
