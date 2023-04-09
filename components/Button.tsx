import React from "react";
import style from "../styles/button.module.css";

interface ButtonProps {
  buttonText: string;
  handleClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ buttonText, handleClick }) => {
  return (
    <button onClick={handleClick} className={`${style.button}`}>
      {buttonText}
    </button>
  );
};

export default Button;
