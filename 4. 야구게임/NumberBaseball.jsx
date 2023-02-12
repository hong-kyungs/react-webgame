import React, { Component }from 'react';
// import { Component } from 'react'; // 위처럼 합쳐줄 수 있다.
import Try from './try';

function getNumbers () { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component {
state = {
  result: '',
  value: '', // input창에 value
  answer: getNumbers(),
  tries: [],
}

onSubmitForm = () => {

} 

onChangeInput = () => {

}

fruits = [
  { fruit: '사과', taste: '맛있다'}, 
  { fruit: '배', taste: '달다'}, 
  { fruit: '포도', taste: '시다'}, 
  { fruit: '딸기', taste: '달콤하다'}, 
  { fruit: '귤', taste: '상큼하다'}, 
  ];

render () {
  return(
    <>
      <h1>{this.state.result}</h1>
      <form onSubmit={this.onSubmitForm}>
        <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
      </form>
      <div>시도: {this.state.tries.length}</div>
      <ul>
        {this.fruits.map((v, i) =>
          <Try value={v} index={i}/> //html에서는 value 같은것이 attribute인데, react에서는 props
      )}
      </ul>

    </>
  )
}
}

export default NumberBaseball;