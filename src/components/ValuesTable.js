import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ValuesTableCell from './ValuesTableCell';

class ValuesTable extends Component {
  render() {
    let casesSortedByValue = [...this.props.cases];
    casesSortedByValue.sort((firstCase, secondCase) => {
      return firstCase.value >= secondCase.value;
    });

    let tableElements = [];
    
    for (let i = 0; i < 13; ++i) {
      tableElements.push(
        <tr key={i + 1}>
          <ValuesTableCell
            case={casesSortedByValue[i]}
            formatMoney={this.props.formatMoney}/>
          <ValuesTableCell
            case={casesSortedByValue[i + 13]}
            formatMoney={this.props.formatMoney}/>
        </tr>
      );
    }

    return (
      <table className="values-table">
        <tbody>
          {tableElements}
        </tbody>
      </table>
    );
  }
}

ValuesTable.propTypes = {
  cases: PropTypes.array.isRequired,
  formatMoney: PropTypes.func.isRequired,
};

export default ValuesTable;
