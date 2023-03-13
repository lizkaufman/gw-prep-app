"use client";

import { useState } from "react";
import styles from "../styles/burgerMenu.module.css";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={`${styles.burgerMenu} ${isOpen ? styles.open : ""} px-4 py-4`}
      onClick={handleMenuClick}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );
}

export default BurgerMenu;
