import React from 'react';



const FxItem = ({ fxSymbol, fxRate, ratesBase }) => {
  return (
    <div className='card'>
        <strong>{fxSymbol} / {ratesBase}</strong>
        <span className='rate'>{fxRate}</span>
    </div>
  );
};

export default FxItem;