import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Case extends Component {
  render() {
    const { caseNum } = this.props.case;
    return this.props.initialCaseNum !== caseNum
      && !this.props.caseOpened ?
      <div className="button">
    <button
        className= "button"
        onClick={this.props.chooseCase.bind(this, caseNum)}>
        {this.props.caseNum}
      </button></div>
      :
      <button className= "button">
        {' '}
      </button>
      
      
  }
}

Case.propTypes = {
  case: PropTypes.object.isRequired,
  // Required for displaying the cases in order. this.props.case
  // is from the SHUFFLED cases array in App, so relying on that
  // to display the cases will result in the cases being in a random order.
  caseNum: PropTypes.number.isRequired,
  chooseCase: PropTypes.func.isRequired,
  initialCaseNum: PropTypes.number.isRequired,
  caseOpened: PropTypes.bool.isRequired,
};

export default Case;
