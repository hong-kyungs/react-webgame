import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
// import NumberBaseball from '../4. 야구게임/NumberBaseballClass';
// import RSP from '../6. 가위바위보/RSPClass';
// import Lotto from '../7. 로또추첨기/LottoClass';
import GameMatcher from './GameMatcher';

const Games = () => {
  return(
    <BrowserRouter>
      <div>
        공통된 부분
        <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임매쳐</Link>
      </div>
      <div>
          {/* 
          <Route path="/number-baseball" component={NumberBaseball}/>
          <Route path="/rock-scissors-paper" component={RSP}/>
          <Route path="/lotto-generator" component={Lotto}/> 
          */}
          <Route path="/game/:name" component={GameMatcher}/>
      </div>
    </BrowserRouter>
  );
};

export default Games;
