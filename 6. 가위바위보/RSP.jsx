import React, { Component }from 'react';

//클래스의 경우 - component 라이프사이클
//constructor(state나 method) -> shouldComponentUpdate(true) -> render -> ref(ref가 있다면) -> componentDidMount
//-> (setState/props 바뀔 때) -> render -> componentDidUpdate ->
//부모가 나를 없앴을 떄 -> componentWillUnmount -> 소멸

class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: 0,
  }

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청 많이 한다
  }

  componentDidUpdate() { // 리렌더링 후 
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다
  }

  render() {
    const { result, score, imgCoord } = this.state; 
    return(
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <div>
          <button id="rock" className='btn' onClick={() => onClickBtn('바위')}>바위</button>
          <button id="scissor" className='btn' onClick={() => onClickBtn('가위')}>가위</button>
          <button id="paper" className='btn' onClick={() => onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;