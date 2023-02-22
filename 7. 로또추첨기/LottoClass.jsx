import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers () {
  console.log(getWinNumbers);
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice( Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const winNumbers = shuffle.splice(0, 6). sort((p, c) => p - c);
  const bonusNumber = shuffle[6];
  return[...winNumbers, bonusNumber]

}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  }

  timeout = [];

  componentDidMount() {
    const { winNumbers } = this.state;
    console.log(winNumbers);
    for(let i = 0; i < winNumbers.length - 1; i++) {
      this.timeout[i] = setTimeout(() => {
        this.setState((prevState) => {
          return{
            winBalls: [...prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000);
    }
    this.timeout[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      })
    }, 7000)
  }

  componentWillUnmount() {
    this.timeout.forEach((v) => {
      clearTimeout(v);
    })
  }

// onClickRedo = () => {};

  render() {
    const { winBalls, bonus, redo } = this.state;
    return(
      <>
        <div>당첨 숫자</div>
        <div id='result'>
          {winBalls.map((v) => <Ball key={v} number = {v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number = {bonus}/>}
        {/* <button onClick={redo ? onClickRedo : () => {}}>한번 더!</button> */}
      </>
    )
  }
}

export default Lotto;