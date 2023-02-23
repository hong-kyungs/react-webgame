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
    winNumbers: getWinNumbers(), //당첨 숫자들
    winBalls: [],
    bonus: null, //보너스 공
    redo: false,
  }

  timeouts = [];

  runTimeout = () =>{
    console.log('runTimeout');
    const { winNumbers } = this.state;
    console.log(winNumbers);
    for(let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return{
            winBalls: [...prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      })
    }, 7000)
  }

  componentDidMount() {
    console.log('DidMount');
    this.runTimeout();
  }

  componentDidUpdate() { //업데이트 하고 싶은 상황을 조건문으로 잘 감싸줘야 한다.
    console.log('DidUpdate');
    if(this.state.winBalls.length === 0) { 
      //(this.state.bonus === null) or (this.state.redo === false)를 조건문으로 넣어줘도 된다.
      this.runTimeout();
    }
  }

  componentWillUnmount() {
    this.timeout.forEach((v) => {
      clearTimeout(v);
    })
  }

onClickRedo = () => {
  console.log('onClickRedo');
  this.setState({
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  });
  this.timeouts = [];
};

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
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    )
  }
}

export default Lotto;