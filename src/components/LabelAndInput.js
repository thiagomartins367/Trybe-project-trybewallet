import React, { Component } from 'react';

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

export default LabelAndInput;
