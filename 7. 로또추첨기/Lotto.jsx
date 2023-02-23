import React, { useState, useRef, useEffect, useMemo, useCallback }from 'react';
import Ball from './Ball';

function getWinNumbers () {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice( Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const winNumbers = shuffle.splice(0, 6). sort((p, c) => p - c);
  const bonusNumber = shuffle[6];
  return[...winNumbers, bonusNumber]
} 

//useMemo는 함수의 리턴값을 기억하고, useCallback은 그 함수자체를 기억하고 있는 것.

const Lotto = () => {
  //getWinNumbers가 반복해서 실행되지 않도록, useMemo에 리턴값(함수를 실행한 결과값)을 기억하게 한다.
  const lottoNumbers = useMemo(() => getWinNumbers(), [])
  const [ winNumbers, setWinNumbers ] = useState(lottoNumbers);
  const [ winBalls, setWinBalls ] = useState([]);
  const [ bonus, setBonus ] = useState(null);
  const [ redo, setRedo ] = useState(false);
  const timeouts = useRef([]);

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


  //useCallback으로 감싸면 함수자체를 기억한다. 좋은점은, Lotto함수 컴포넌트가 재실행되도, onclickRedo는 새로 생성되는 것이 아니라 그 함수를 기억해두고 그 것을 사용.
  //단 console.log(winNumbers);실행해보면 -> 기억을 너무 잘해서 첫번째 함수리턴값을 계속 기억한다.
  //useCallback 안에서 쓰이는 state는 항상 두번째인수자리에 넣어줘야한다 -> 두번째인수자리가 바뀌면 새로 실행.
  //자식컴포넌트에 props로 함수를 넘길때는 usecallback을 반드시 해줘야한다. 함수자체는 바뀐게 없어도 부모가 렌더링되면 자식컴포넌트도 리렌더링이 발생할 수 있다. -> useCallback으로 감싸면 부모로부터 받은 함수가 변화가 없을 때 쓸데없이 리렌더링 된지 않는다. 
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

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