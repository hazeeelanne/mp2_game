import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Case from './Case';

class Cases extends Component {
  render() {
    let caseElements = [];

    for (let i = 0; i < this.props.cases.length; ++i) {
      caseElements.push(<Case key={i}
        case={this.props.cases[i]}
        caseNum={i + 1}
        chooseCase={this.props.chooseCase}
        initialCaseNum={this.props.initialCaseNum}
        caseOpened={this.props.cases[i].opened} />);
      if (i % 5 === 0 && i !== 0) {
        caseElements.push(<br key={i * 10}/>);
      }
    }

    return caseElements.map(element => element);
  }
}

Cases.propTypes = {
  cases: PropTypes.array.isRequired,
};

export default Cases;
