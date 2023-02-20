import React, { useState, useEffect } from "react";
import Timer from './Timer';
import Selector from './Selector'

type Currency = "USD" | "CAD" | "EUR" | "GBP";
type Crypto = "ETH" | "BTC" | "SOL" | "MATIC";
type ConversionRate = {
  price: number;
  timestamp: number;
};

const source = "https://api.coinbase.com/v2/prices/"
const currencies: Currency[] = ["USD", "CAD", "EUR", "GBP"];
const cryptos: Crypto[] = ["ETH", "BTC", "SOL", "MATIC"]

const ConversionRateDisplay = () => {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [crypto, setCrypto] = useState<Crypto>("ETH");
  const [conversionRate, setConversionRate] = useState<ConversionRate>({price: 0, timestamp: Date.now()});


  useEffect(() => {
    const fetchData = async () => {
      const url = source + `${crypto}-${currency}/spot`;
      try {
        const response = await fetch(url)
        const data = await response.json();
        const price = data.data?.["amount"];
        if (price) {
          const timestamp = Date.now();
          setConversionRate({ price, timestamp });
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30 * 1000); // 30 seconds interval

    return () => { clearInterval(intervalId); };
  }, [currency, crypto]);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrency(event.target.value as Currency);

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCrypto(event.target.value as Crypto);

  const currentPrice = Number(conversionRate.price).toFixed(3) // 3 decimal precision
  const formattedPrice = (<div>
    <span>You have to pay </span>
    <span className="font-bold">{currentPrice} {currency} </span>
    <span>for </span>
    <span className="font-bold">1 {crypto}</span>
  </div>);
  const displayPrice = conversionRate.price? formattedPrice: <div>loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-blue-200 box-border border-2 border-blue-400 rounded-lg h-48 w-96 p-4">
        <Selector value={currency} onChange={handleCurrencyChange} items={currencies}/>
        <Selector value={crypto} onChange={handleCryptoChange} items={cryptos}/>
        <Timer lastUpdateTime={conversionRate.timestamp}/>
        <div>{displayPrice}</div>
      </div>
    </div>
  );
};

export default ConversionRateDisplay;

