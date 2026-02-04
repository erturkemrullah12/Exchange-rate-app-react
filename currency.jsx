import React, { useState } from "react";
import "../CSS/currency.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_IpgR1z1X6Xq6JP2UG2e3niYMR7Czd6siDVIsK5IH";

function Currency() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState(0);

    const exchange = async () => {
        try {
            // console.log(amount)
            // console.log(fromCurrency)
            // console.log(toCurrency)

            const response = await axios.get(
                `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
            );

            const rates = response.data.data;

            const converted = Number(amount) * rates[toCurrency];
            console.log("Sonuç:", converted);


            setResult(converted.toFixed(2));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="currency-div">
            <div
                style={{
                    fontFamily: "arial",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <h3>DÖVİZ KURU UYGULAMASI</h3>
            </div>

            <div style={{ marginTop: "25px" }}>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="amount"
                />

                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="from-Currency-option"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                </select>

                <FaRegArrowAltCircleRight className="arrow-icon" />


                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="to-Currency-option"
                >
                    <option value="TRY">TRY</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>

                <input
                    value={result}
                    readOnly
                    type="number"
                    className="result"
                />
            </div>

            <div>
                <button onClick={exchange} className="exchange-button">
                    ÇEVİR
                </button>
            </div>
        </div>
    );
}

export default Currency;
