"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/header.module.css";
import logo from "../images/Games_Workshop_logo.svg";

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
      <BurgerMenu toggleMenu={toggleMenu} />
      {showMenu && <MenuDrawer />}
    </header>
  );
};

export default Header;
