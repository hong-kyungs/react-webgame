import React, { useState, useRef }from 'react';
import Try from './try';

function getNumbers () { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i += 1){
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [ result, setResult ] = useState('');
  const [ value, setValue ] = useState('');
  const [ answer, setAnswer ] = useState(getNumbers); // lazy unit, 늦은 초기화
  const [ tries, setTries ] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런!!');
      setTries((prevTries) => {
        return [...prevTries, {try: value, result: '홈런!'}]
      })
      alert('게임을 다시 시작합니다.');
      setValue('')
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();
    } else { // 정답이 아니면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번이상 틀렸을 떄
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`)
        alert('게임을 다시 시작합니다.');
        setValue('')
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]);
        setValue('');
        inputEl.current.focus();
      }
    }
  } 
  
  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value)
  }

  return(
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}/>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) =>
          <Try key={`${i + 1}차 시도:`} tryInfo={v}/>
      )}
      </ul>
    </>
  )
}

export default NumberBaseball;