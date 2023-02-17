import React, { Component }from 'react';
// import { Component } from 'react'; // 위처럼 합쳐줄 수 있다.
import Try from './try';

//function을 class안에 넣어주면 class안에서만 쓸 수 있고, this.getNumbers();로 this를 붙여줘야한다.
function getNumbers () { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i += 1){
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
state = {
  result: '',
  value: '', // input창에 value
  answer: getNumbers(),
  tries: [],
};

onSubmitForm = (e) => {
  const { result, value, tries, answer } = this.state;
  e.preventDefault();
  if (value === answer.join('')) {
    this.setState({
      result: '홈런!',
      tries: [...tries, {try: value, result: '홈런!'}],
    });
    alert('게임을 다시 시작합니다.');
    this.setState({ // 게임을 다시 시작해야 하기 떄문에 초기화
      value:'',
      answer: getNumbers(),
      tries: [],
    });
  } else { // 정답이 아니면
    const answerArray = value.split('').map((v) => parseInt(v));
    let strike = 0;
    let ball = 0;
    if (tries.length >= 9) { // 10번이상 틀렸을 떄
      this.setState({
        result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
      });
      alert('게임을 다시 시작합니다.');
      this.setState({ // 게임을 다시 시작해야 하기 떄문에 초기화
        value:'',
        answer: getNumbers(),
        tries: [],
      });
    } else {
      for (let i = 0; i < 4; i += 1) {
        if (answerArray[i] === answer[i]) {
          strike += 1;
        } else if (answer.includes(answerArray[i])){
          ball += 1;
        }
      }
      this.setState({
        tries: [...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}],
        value: '',
      })
    }
  }
} 

onChangeInput = (e) => {
  console.log(this.state.answer);
  this.setState({
    value: e.target.value
  })
}


render () {
  const { result, value, tries } = this.state;
  return(
    <>
      <h1>{result}</h1>
      <form onSubmit={this.onSubmitForm}>
        <input maxLength={4} value={value} onChange={this.onChangeInput}/>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) =>
          <Try key={`${i + 1}차 시도:`} tryInfo={v}/> //html에서는 value 같은것이 attribute인데, react에서는 props
      )}
      </ul>

    </>
  )
}
}

export default NumberBaseball;