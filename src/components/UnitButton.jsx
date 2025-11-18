import "./UnitButton.css";

export default function UnitButton({ onToggle, isFarenheit }) {
    function handleToggle() {
        const newValue = !isFarenheit;
        if (onToggle) onToggle(newValue);
    }

    return (
        <div className="checkbox-apple">
            <input
                type="checkbox"
                id="toggle"
                onChange={handleToggle}
                checked={isFarenheit}
            />
            <label htmlFor="toggle">
                <span className="celsius">ºC</span>
                <span className="fahrenheit">ºF</span>
            </label>
        </div>
    );
}
