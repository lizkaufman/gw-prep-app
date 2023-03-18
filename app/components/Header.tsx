"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/header.module.css";
import logo from "../images/Games_Workshop_logo.svg";
import shoppingCart from "../images/shopping-cart.png";

import BurgerMenu from "./BurgerMenu";
import MenuDrawer from "./MenuDrawer";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header
      className={`${styles.header} flex flex-row justify-space-between align-center`}
    >
      <Image
        alt="games workshop logo"
        src={logo}
        className={`${styles.logo} py-4`}
        width={200}
      />
      <div>
        <Image
          alt="shopping cart"
          src={shoppingCart}
          className={`py-4`}
          width={30}
          height={60}
        />
        <BurgerMenu toggleMenu={toggleMenu} />
      </div>
      {showMenu && <MenuDrawer />}
    </header>
  );
};

export default Header;
