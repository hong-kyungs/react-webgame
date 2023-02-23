import React, { useState, useRef, useEffect }from 'react';
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

const Lotto = () => {
  const [ winNumbers, setWinNumbers ] = useState(getWinNumbers());
  const [ winBalls, setWinBalls ] = useState([]);
  const [ bonus, setBonus ] = useState(null);
  const [ redo, setRedo ] = useState(false);
  const timeouts = useRef([]);

  // const runTimeout = () =>{
  //   console.log(winNumbers);
  //   for(let i = 0; i < winNumbers.length - 1; i++) {
  //     timeouts[i] = setTimeout(() => {
  //       setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
  //     }, (i + 1) * 1000);
  //   }
  //   timeouts[6] = setTimeout(() => {
  //     setBonus(winNumbers[6]);
  //     setRedo(true);
  //   }, 7000)
  // }

  useEffect(() =>{
    console.log(winNumbers);
    console.log('useEffect')
    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]])
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000)
  }, [timeouts.current]) //input,의존성배열이 빈배열([])이면 componentDidMount와 동일
  //배열에 요소가 있으면 componentDidMount 와 componentDidUpdate 둘 다 수행
  //timeouts.current가 바뀌는 시점에 DidUpdate가 실행 -> class에 Didupdate와 완벽하게 일치하기는 어렵다.

  const onClickRedo = () => {
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };

  return(
    <>
      <div>당첨 숫자</div>
      <div id='result'>
        {winBalls.map((v) => <Ball key={v} number = {v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number = {bonus}/>}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  )
}

export default Lotto;