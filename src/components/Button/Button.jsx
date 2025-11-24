import { clsx } from "clsx"; 

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  icon = null, 
  iconRight = null, 
  fullWidth = false,
}) => {
  const baseStyles =
    "inline-flex shadow items-center text-nowrap justify-center px-2 py-1 rounded transition duration-300 cursor-pointer text-sm";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "bg-primary text-white hover:bg-primary-hover",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        fullWidth && "w-full",
        (disabled || loading) && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {/* Spinner while loading */}
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
          ></path>
        </svg>
      )}

      {/* Optional Icon Left */}
      {!loading && icon && <span className="mr-2">{icon}</span>}

      {children}

      {/* Optional Icon Right */}
      {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
