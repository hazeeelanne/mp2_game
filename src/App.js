import React, { Component } from 'react';

import Cases from './components/Cases';
import ValuesTable from './components/ValuesTable';
import Header from './components/Header';
import TurnInfo from './components/TurnInfo';

import './App.css';

const CASE_VALUES = [0.01, 1, 5, 10, 25, 50, 75, 100,
  200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000,
  75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];

const ORIGINAL_NUM_CHOICES = 2;

function shuffle(array) {
  // Copied from Stack Overflow
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      --counter;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: this.createCases(),
      initialCaseChosen: false,
      initialCase: '',
      initialCaseNum: 0,
      numCasesToChoose: ORIGINAL_NUM_CHOICES,
      caseChosenNormally: '',
      offer: 0,
      turnNum: 1,
      numCasesRemaining: 26,
      finalOfferMade: false,
    }
  }

  createCases = () => {
    let cases = [];

    let randomCaseValues = shuffle([...CASE_VALUES]);

    randomCaseValues.forEach((value, index) => {
      cases.push({
        value,
        caseNum: index + 1,
        opened: false,
      });
    });

    return cases;
  }

  chooseCase = (caseNum) => {
    if (!this.state.initialCaseChosen) {
      this.setState({
        initialCaseChosen: true,
        initialCase: this.state.cases[caseNum - 1],
        initialCaseNum: caseNum,
      });
    }
    else {
      this.state.cases[caseNum - 1].opened = true;
      this.setState({
        numCasesToChoose: this.state.numCasesToChoose - 1,
        caseChosenNormally: this.state.cases[caseNum - 1],
      });
    }

    this.setState({
      numCasesRemaining: this.state.numCasesRemaining - 1,
    });

    if (this.state.numCasesToChoose - 1 === 0) {
      this.calculateOffer();
    }
  }

  calculateOffer = () => {
    // Using a rough formula from this link:
    // https://answers.yahoo.com/question/index?qid=20061106173902AAc48qj
    const nonOpenedCases = [...this.state.cases.filter(c => !c.opened)];
    const valueOfCases = nonOpenedCases.reduce(
      (accumulator, c) => {
        return accumulator + c.value;
    }, 0);
    const averageValueOfCases = valueOfCases / nonOpenedCases.length;
    const newOffer =
      (averageValueOfCases * (this.state.turnNum / 10)).toFixed(2);

    this.setState({
      offer: newOffer,
    });
  }

  acceptDeal = () => {
    alert("You won " + this.formatMoney(this.state.offer) + "!"
          + "\nThank you for playing Deal or No Deal!");
  }

  rejectDeal = () => {
    const newChoiceNum = ORIGINAL_NUM_CHOICES - this.state.turnNum;
    const newNumCasesToChoose = newChoiceNum > 1 ?
      newChoiceNum : 1;
    this.setState({
      turnNum: this.state.turnNum + 1,
      numCasesToChoose: newNumCasesToChoose,
    });

    if (this.state.numCasesRemaining === 1) {
      this.setState({
        numCasesToChoose: 0,
        finalOfferMade: true,
      })
    }
  }

  keepCase = () => {
    this.state.offer = this.state.initialCase.value;

    this.acceptDeal();
  }

  swapCase = () => {
    const lastCase = [...this.state.cases.filter(c => {
      return c !== this.state.initialCase && !c.opened;
    })][0];

    this.state.offer = lastCase.value;

    this.acceptDeal();
  }

  formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    // Mostly copied from
    // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return "₱" + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <br/>
        <TurnInfo
          initialCaseNum={this.state.initialCaseNum}
          numCasesToChoose={this.state.numCasesToChoose}
          offer={this.state.offer}
          acceptDeal={this.acceptDeal}
          rejectDeal={this.rejectDeal}
          numCasesRemaining={this.state.numCasesRemaining}
          keepCase={this.keepCase}
          swapCase={this.swapCase}
          formatMoney={this.formatMoney}
          finalOfferMade={this.state.finalOfferMade}/>
        <br/>
         
            <Cases cases={this.state.cases}
              chooseCase={this.chooseCase}
              initialCaseNum={this.state.initialCaseNum} />
         
         <li className="spacer" style={{
              visibility: 'hidden',
              flexGrow: '5',
            }} />

            <div className='valuesTable'>
            <ValuesTable
            cases={this.state.cases}
            formatMoney={this.formatMoney}/>
            </div>
      </div>
    );
  }
}

export default App;
