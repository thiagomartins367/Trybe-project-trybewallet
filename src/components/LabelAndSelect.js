import React, { Component } from 'react';

class LabelAndSelect extends Component {
  render() {
    const {
      labelContent,
      selectContent,
      selectId,
      selectDataTestid,
      optionsContent,
      optionsDataTestId,
      onChangeEvent,
      nameSelect,
    } = this.props;
    // console.log('optionsContent-->: ', optionsContent);
    return (
      <div>
        <label htmlFor={ selectId }>{ labelContent }</label>
        <select
          id={ selectId }
          onChange={ onChangeEvent }
          name={ nameSelect }
          data-testid={ selectDataTestid }
        >
          {optionsContent.map((element) => (
            <option
              key={ element }
              data-testid={ optionsDataTestId ? element : "" }
            >
              { element }
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default LabelAndSelect;