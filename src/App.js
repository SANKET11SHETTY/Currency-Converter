import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "amount":
        setAmount(value);
        break;

      case "fromCurrency":
        setFromCurrency(value);
        break;

      case "toCurrency":
        setToCurrency(value);
        break;
      default:
        console.log("made with love from SKT");
    }
  };

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRate(response.data.rates);
      })
      .catch((error) => {
        console.error("The currency fetch was failed due to an error :", error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];

    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  return (
    <div className="card">
      <img
        className="imgs"
        src="https://i.gifer.com/origin/0d/0dd77a5f8480e6a51439776f04f317e8_w200.gif"
        alt=""
      />
      <h1 className="text-6xl">Currency Converter</h1>

      <div className="currency_exchnage">
        <div className="input_container">
          <label className="input_label">Amount:</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            className="input_field"
          />
        </div>
        <div className="input_container">
          <label className="input_label">From:</label>
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={handleChange}
            className="input_field"
          >
            {Object.keys(exchangeRate).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="input_container">
          <label className="input_label">To:</label>
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={handleChange}
            className="input_field"
          >
            {Object.keys(exchangeRate).map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="output">
        <h2>Converted Amount: {convertedAmount}</h2>
      </div>
    </div>
  );
};

export default App;
