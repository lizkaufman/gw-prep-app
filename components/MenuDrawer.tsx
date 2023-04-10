import React from "react";
import Image from "next/image";
import logos from "../libs/images/logos";
import styles from "../styles/burgerMenu.module.css";

const MenuDrawer = () => {
  return (
    <menu className={`${styles.menu} flex flex-column align-center`}>
      <Image
        className={styles.menuImage}
        width={230}
        alt="age of sigmar logo"
        src={logos.aosLogo}
      />
      <Image
        className={styles.menuImage}
        width={200}
        alt="40k logo"
        src={logos.fortyKLogo}
      />
      <Image
        className={styles.menuImage}
        width={200}
        alt="horus heresy logo"
        src={logos.horusHeresyLogo}
      />
      <Image
        className={styles.menuImage}
        width={200}
        alt="middle earth logo"
        src={logos.middleEarthLogo}
      />
      <Image
        className={styles.menuImage}
        width={200}
        alt="black library logo"
        src={logos.blackLibraryLogo}
      />
      <Image
        className={styles.menuImage}
        width={200}
        alt="citadel paint logo"
        src={logos.citadelLogo}
      />
    </menu>
  );
};

export default MenuDrawer;
