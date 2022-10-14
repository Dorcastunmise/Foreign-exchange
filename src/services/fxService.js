export const fetchExchangeRates = async () => {
  const response = await fetch('https://api.exchangerate.host/latest?base=USD');

  return response.json();
};


export const searchFxRates = (rates, searchRates) => {
    if(searchRates.trim().length === 0 ) return;
    const results = {};
    for (const [key, value] of Object.entries(rates)) {
        if(key.toUpperCase().includes(searchRates.toUpperCase())) {
            results[key] = value;
        }
    }
        return results;
}

