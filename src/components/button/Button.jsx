import './Button.css';

function Button({ children, clickHandler, disabled, type = "button" }) {
    return (
        <button
            type={type}
            className="nav-button"
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;