
import { useState, useEffect } from "react";


const CURRENCIES = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR", "JPY", "CAD", "AUD"];

export default function CurrencyConverter() {

  const [amount, setAmount] = useState(1);
  

  const [fromCurrency, setFromCurrency] = useState("USD");
 
  const [toCurrency, setToCurrency] = useState("PKR");
 

  const [rates, setRates] = useState({});
 

  const [result, setResult] = useState(null);
  

  const [loading, setLoading] = useState(false);
 

  const [error, setError] = useState("");

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    setError("");

    try {
      
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      
      setRates(data.rates);
    } catch (err) {
      setError("Check your internet connection or try again later.");
    }

    setLoading(false);
  };

  const convertCurrency = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;


    if (amount <= 0 || amount === "" || isNaN(amount)) {
        setError("Enter correct amount!");
        setResult(null);
        return;
    }

    setError("");

    
    const amountInUSD = amount / rates[fromCurrency];
    const converted = amountInUSD * rates[toCurrency];

    setResult(converted.toFixed(2)); 
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #525286 0%, #051951 50%, #618ec6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "20px",
      padding: "40px",
      width: "100%",
      maxWidth: "420px",
      color: "white",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "8px",
      color: "#e2e8f0",
    },
    subtitle: {
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "13px",
      marginBottom: "32px",
    },
    label: {
      display: "block",
      fontSize: "12px",
      color: "#94a3b8",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "10px",
      color: "white",
      fontSize: "18px",
      outline: "none",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "10px",
      color: "white",
      fontSize: "15px",
      outline: "none",
      cursor: "pointer",
      marginBottom: "16px",
    },
    group: {
      marginBottom: "16px",
    },
    row: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      marginBottom: "8px",
    },
    swapBtn: {
      background: "rgba(99, 102, 241, 0.3)",
      border: "1px solid rgba(99, 102, 241, 0.5)",
      borderRadius: "50%",
      width: "42px",
      height: "42px",
      color: "white",
      fontSize: "18px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    convertBtn: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #1d1e4d, #7c67ad)",
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "8px",
    },
    resultBox: {
      background: "rgba(99, 102, 241, 0.15)",
      border: "1px solid rgba(99, 102, 241, 0.3)",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      marginTop: "20px",
    },
    resultAmount: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#a5b4fc",
    },
    resultLabel: {
      fontSize: "13px",
      color: "#94a3b8",
      marginTop: "4px",
    },
    errorBox: {
      background: "rgba(239, 68, 68, 0.15)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: "10px",
      padding: "12px",
      color: "#fca5a5",
      fontSize: "13px",
      textAlign: "center",
      marginTop: "12px",
    },
    halfWidth: {
      flex: 1,
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>

        
        <h1 style={styles.title}>💱 Currency Converter</h1>
        <p style={styles.subtitle}>
          {loading ? "Loading rates..." : "Live exchange rates"}
          
        </p>

        
        <div style={styles.group}>
          <label style={styles.label}>Amount</label>
          <input
    style={styles.input}
    type="number"
    value={amount}
    min="0"
    onChange={(e) => {
        const val = e.target.value;
        
        if (val < 0) {
            setError("use positive number!");
            setAmount(0);
        } else {
            setError("");
            setAmount(val);
            setResult(null);
        }
    }}
/>
        </div>

        
        <div style={styles.row}>

          <div style={styles.halfWidth}>
            <label style={styles.label}>From</label>
            <select
              style={styles.select}
              value={fromCurrency}
              onChange={(e) => {
                setFromCurrency(e.target.value);
                setResult(null);
              }}
            >
              
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}
                  style={{ background: "#1e293b" }}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          
          <div style={{ marginTop: "14px" }}>
            <button style={styles.swapBtn} onClick={swapCurrencies}>
              ⇄
            </button>
          </div>

          <div style={styles.halfWidth}>
            <label style={styles.label}>To</label>
            <select
              style={styles.select}
              value={toCurrency}
              onChange={(e) => {
                setToCurrency(e.target.value);
                setResult(null);
              }}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}
                  style={{ background: "#1e293b" }}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

        </div>

        
        <button
          style={{ ...styles.convertBtn, opacity: loading ? 0.6 : 1 }}
          onClick={convertCurrency}
          disabled={loading}
        >
          {loading ? "Loading..." : "Convert now →"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <div style={styles.resultAmount}>{result} {toCurrency}</div>
            <div style={styles.resultLabel}>
              {amount} {fromCurrency} = {result} {toCurrency}
            </div>
          </div>
        )}
       
        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        
        {rates[fromCurrency] && rates[toCurrency] && (
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "12px", marginTop: "16px" }}>
            1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
          </p>
        )}

      </div>
    </div>
  );
}