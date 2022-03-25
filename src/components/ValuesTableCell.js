import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValuesTableCell extends Component {
  render() {
    const caseValue = this.props.case.value;
    let caseValueString = caseValue === 0.01 ?
      "₱0.01" : this.props.formatMoney(caseValue, 0);

    return this.props.case.opened ?

      <td className="values-table-cell" style={{backgroundColor: "#888"}}>
        {caseValueString}
      </td> :
      <td className="values-table-cell" style={{backgroundColor: "#FFB2A6"}}>
        {caseValueString}
      </td>
  }
}

ValuesTableCell.propTypes = {
  case: PropTypes.object.isRequired,
  formatMoney: PropTypes.func.isRequired,
};

export default ValuesTableCell;
