import React from "react";
import Image from "next/image";
import styles from "../styles/header.module.css";
import logo from "../images/Games_Workshop_logo.svg";

import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <div className="flex flex-row justify-space-between align-center">
      <Image
        alt="games workshop logo"
        src={logo}
        className={`${styles.logo} py-4 px-3`}
        width={200}
      />
      {/* <h2 className="px-4 py-4">Games Workshop</h2> */}
      <BurgerMenu />
    </div>
  );
};

export default Header;
