

function InputBox({
    label,           
    amount,          
    onAmountChange,  
    onCurrencyChange,
    currencyOptions = [], 
    selectedCurrency = "usd", 
    amountDisable = false,    
    currencyDisable = false,  
}) {


    return (
        <div style={styles.container}>
            
            
            <div style={styles.left}>
                <label style={styles.label}>{label}</label>
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    
                    value={amount}
                    onChange={(e) => {
                        onAmountChange && onAmountChange(
                            Number(e.target.value)
                        )
                        
                    }}
                />
            </div>

            
            <div style={styles.right}>
                <label style={styles.label}>Currency</label>
                <select
                    style={styles.select}
                    value={selectedCurrency}
                    disabled={currencyDisable}
                    onChange={(e) => {
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    }}
                >
                   
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                            
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
}


const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "16px",
        border: "1px solid rgba(255,255,255,0.2)",
    },
    left: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flex: 1,
    },
    right: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: "flex-end",
    },
    label: {
        fontSize: "12px",
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
    input: {
        background: "transparent",
        border: "none",
        outline: "none",
        color: "white",
        fontSize: "22px",
        fontWeight: "600",
        width: "150px",
    },
    select: {
        background: "rgba(99,102,241,0.3)",
        border: "1px solid rgba(99,102,241,0.5)",
        borderRadius: "8px",
        color: "white",
        padding: "8px 12px",
        fontSize: "14px",
        cursor: "pointer",
        outline: "none",
    }
};

export default InputBox;