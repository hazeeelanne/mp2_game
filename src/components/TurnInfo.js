import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TurnInfo extends Component {
  render() {
    if (this.props.initialCaseNum === 0) {
      return (
        <div className="turn-info">
          <h2>Please choose the case you wish to keep.</h2>
        </div>
      );
    }
    if (this.props.numCasesToChoose !== 0) {
      return (
        <div className="turn-info">
          <h2>Your case: {this.props.initialCaseNum}</h2>
          <p>Please choose {this.props.numCasesToChoose} more case(s)</p>
        </div>
      );
    }
    if (this.props.finalOfferMade
      && this.props.numCasesRemaining === 1) {
      return (
        <div className="turn-info">
          <h2>Would you like to keep your case (case #{this.props.initialCaseNum}),
           or would you like to swap your case for the last remaining case?
          </h2>
          <button className="button" onClick={this.props.keepCase}>Keep</button> <button onClick={this.props.swapCase}>Swap</button>
        </div>
      );
    }
    return (
      <div className="turn-info">
        <h2>Offer: {this.props.formatMoney(this.props.offer)}</h2>
        <button className= "button"
         onClick={this.props.acceptDeal}>Deal</button>or<button className= "button" onClick={this.props.rejectDeal}>No Deal?</button>
      </div>
    );
  }
}

TurnInfo.propTypes = {
  numCasesToChoose: PropTypes.number.isRequired,
  initialCaseNum: PropTypes.number.isRequired,
  offer: PropTypes.string.isRequired,
  acceptDeal: PropTypes.func.isRequired,
  rejectDeal: PropTypes.func.isRequired,
  numCasesRemaining: PropTypes.number.isRequired,
  keepCase: PropTypes.func.isRequired,
  swapCase: PropTypes.func.isRequired,
  formatMoney: PropTypes.func.isRequired,
  finalOfferMade: PropTypes.bool.isRequired,
};

export default TurnInfo;
