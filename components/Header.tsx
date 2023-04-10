"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import logos from "@/libs/images/logos";
import shoppingCart from "../libs/images/shopping-cart.png";

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
      <Link href="/">
        <Image
          alt="games workshop logo"
          src={logos.gamesWorkshopLogo}
          className={`${styles.logo} py-4`}
          width={225}
        />
      </Link>
      <div>
        <Link href="/viewCart">
          <Image
            alt="shopping cart"
            src={shoppingCart}
            className={`py-4`}
            width={30}
            height={60}
          />
        </Link>
        <BurgerMenu toggleMenu={toggleMenu} />
      </div>
      {showMenu && <MenuDrawer />}
    </header>
  );
};

export default Header;
