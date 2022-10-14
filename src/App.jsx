import React from 'react';
import FxItem from './components/FxItem';
import { fetchExchangeRates, searchFxRates } from './services/fxService';

function App() {
  const [ rates, setRates ] = React.useState(null);
  const [ ratesBase, setRatesBase ] = React.useState('');
  const [ searchRates, setSearchRates ] = React.useState('');
  const [ searchResults, setSearchResults ] = React.useState(null);


  const onSearch = (e) => {
    e.preventDefault();
    setSearchRates(e.target.value);
  }


  React.useEffect(() => {

    let componentIsMounted = true;

    const getFxData = () => {
      fetchExchangeRates()
      .then(data => {
        console.log('fx data', data);
        if(componentIsMounted) {
          setRates(data.rates);
          setRatesBase(data.base);
      }
      }).catch(err => {
        console.log(err);
      })
    };

    // load initially
    getFxData();

    const fetchInterval = setInterval(getFxData, 1000 * 60);

    return () => {
      clearInterval(fetchInterval);
      componentIsMounted = false;
    };

  }, []);

  React.useEffect(() => {
      if(searchRates.trim().length > 0) {
        setSearchResults(searchFxRates(rates, searchRates));
      }
      else {
        setSearchResults(rates);
      }
  }, [searchRates, rates]);


  return (
    <div className='app'>
      <header>
        <h1>Foreign Exchange Rates</h1>
      </header>
      <input 
      value={searchRates} 
      onChange={onSearch}
      className='input'
      placeholder='Type in currency code....'
      />
      {searchResults ? Object.keys(searchResults).map((key) => (
      <FxItem
       key={key} 
       fxSymbol={key} 
       fxRate={searchResults[key]}
       ratesBase={ratesBase} />)) : []}   
    </div>
  )
}

export default App;
