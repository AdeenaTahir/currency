

import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

import InputBox from "./components/InputBox";


function App() {

   
    const [amount, setAmount] = useState(0);
    

    const [from, setFrom] = useState("usd");
   

    const [to, setTo] = useState("pkr");
    

    const [convertedAmount, setConvertedAmount] = useState(0);
  

    const currencyInfo = useCurrencyInfo(from);
    

    const options = Object.keys(currencyInfo);
   
    const convert = () => {
        setConvertedAmount(
            amount * currencyInfo[to]
           
        );
    };

    

    const swap = () => {
        setFrom(to);
        
        setTo(from);
        
        setConvertedAmount(amount);
        setAmount(convertedAmount);
       
    };

    

    return (
        <div style={styles.page}>

            <div style={styles.card}>

                
                <h1 style={styles.title}>💱 Currency Converter</h1>
                <p style={styles.subtitle}>Real-time exchange rates</p>

                
                <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    selectedCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                    onCurrencyChange={(currency) => setFrom(currency)}
                />
                
                <div style={styles.swapContainer}>
                    <button style={styles.swapBtn} onClick={swap}>
                        ⇄ Swap
                    </button>
                </div>

                
                <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    selectedCurrency={to}
                    onAmountChange={(amount) => setConvertedAmount(amount)}
                    onCurrencyChange={(currency) => setTo(currency)}
                    amountDisable={true}
                    
                />

                
                <button style={styles.convertBtn} onClick={convert}>
                    Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>

            </div>
        </div>
    );
}


const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
    },
    card: {
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "40px",
        width: "100%",
        maxWidth: "440px",
        color: "white",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "8px",
        color: "#e2e8f0",
    },
    subtitle: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "13px",
        marginBottom: "28px",
    },
    swapContainer: {
        display: "flex",
        justifyContent: "center",
        margin: "12px 0",
    },
    swapBtn: {
        background: "rgba(99,102,241,0.3)",
        border: "1px solid rgba(99,102,241,0.5)",
        borderRadius: "20px",
        color: "white",
        padding: "8px 20px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
    },
    convertBtn: {
        width: "100%",
        padding: "16px",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        border: "none",
        borderRadius: "12px",
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "16px",
    },
};

export default App;