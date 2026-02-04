import { useEffect, useState } from "react";

const API_KEY = "API_KEYİNİ_BURAYA_YAZ";

function CurrencyTable() {
    const [rates, setRates] = useState({});
    const [prevRates, setPrevRates] = useState({});

    useEffect(() => {
        fetchRates();
        const interval = setInterval(fetchRates, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchRates = async () => {
        try {
            const res = await fetch(
                `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=USD,EUR,GBP&base_currency=TRY`
            );
            const data = await res.json();

            setPrevRates(rates);
            setRates(data.data);
        } catch (error) {
            console.error("Kur çekme hatası:", error);
        }
    };

    const calculateChange = (currency) => {
        if (!prevRates[currency]) return 0;
        const oldRate = prevRates[currency];
        const newRate = rates[currency];
        return (((newRate - oldRate) / oldRate) * 100).toFixed(2);
    };

    return (
        <div>
            <h3>Döviz Kurları</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Döviz</th>
                        <th>TRY</th>
                        <th>Değişim</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(rates).map((currency) => {
                        const change = calculateChange(currency);
                        return (
                            <tr key={currency}>
                                <td>{currency}</td>
                                <td>{rates[currency].toFixed(2)}</td>
                                <td style={{ color: change > 0 ? "green" : "red" }}>
                                    {change > 0 && "+"}
                                    {change}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CurrencyTable;
