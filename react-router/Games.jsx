import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import NumberBaseball from '../4. 야구게임/NumberBaseballClass';
import RSP from '../6. 가위바위보/RSPClass';
import Lotto from '../7. 로또추첨기/LottoClass';

const Games = () => {
  return(
    <BrowserRouter>
      <div>
        공통된 부분
        <Link to="/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/lotto-generator">로또생성기</Link>
      </div>
      <div>
          <Route path="/number-baseball" component={NumberBaseball}/>
          <Route path="/rock-scissors-paper" component={RSP}/>
          <Route path="/lotto-generator" component={Lotto}/>
      </div>
    </BrowserRouter>
  );
};

export default Games;
