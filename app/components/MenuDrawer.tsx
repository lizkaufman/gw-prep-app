import React from "react";
import Image from "next/image";
import logos from "../images/logos/";
import styles from "../styles/burgerMenu.module.css";

const MenuDrawer = () => {
  return (
    <menu className={styles.menu}>
      <Image width={200} alt="age of sigmar logo" src={logos.aosLogo} />
      <Image width={200} alt="40k logo" src={logos.fortyKLogo} />
      <Image width={200} alt="horus heresy logo" src={logos.horusHeresyLogo} />
      <Image width={200} alt="middle earth logo" src={logos.middleEarthLogo} />
      <Image
        width={200}
        alt="black library logo"
        src={logos.blackLibraryLogo}
      />
      <Image width={200} alt="citadel paint logo" src={logos.citadelLogo} />
    </menu>
  );
};

export default MenuDrawer;
