import React, { memo } from "react";
import * as S from './components'

const HomePage = ({ history: { push } }) => {
  return (
    <S.Block>
      <h2>INÍCIO - Area Administrativa</h2>
      <S.P>Crie blocos de visualização rápida</S.P>
    </S.Block>
  );
};

export default memo(HomePage);
