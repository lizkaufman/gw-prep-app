import React from "react";
import styles from "../styles/header.module.css";

import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <div className="flex flex-row justify-center ">
      <h2 className="px-3 py-4">Games Workshop</h2>
      <BurgerMenu />
    </div>
  );
};

export default Header;
