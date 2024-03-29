"use client";
import { useEffect, useRef } from "react";
import { Source_Serif_Pro, Open_Sans } from "next/font/google";
import Image from "next/image";

import styles from "../styles/page.module.css";
import heroImage from "../libs/images/hero-image.webp";

import ItemContainer from "../components/itemCards/ItemContainer";
import Button from "../components/Button";

import { useShoppingCart } from "../libs/machines/shoppingCartMachine/shoppingCartContext";

// const noto_serif = Noto_Serif({ weight: "400", subsets: ["latin"] });
const source_serif_pro = Source_Serif_Pro({
  weight: "600",
  subsets: ["latin"],
});
const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Home({
  cartState,
  cartSend,
}: {
  cartState: any;
  cartSend: any;
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className={`${styles.main} flex flex-column justify-center align-center justify-space-between`}
    >
      <div
        className={`${styles.ctaContainer} px-4 flex flex-column justify-space-between align-center`}
      >
        <div className={`${styles.heroImageContainer}`}>
          <Image
            className={styles.heroImage}
            src={heroImage}
            alt="lord of hubris and realmgore ritualist models"
            priority
          />
        </div>
        <div className={`${styles.textOverlay} px-2`}>
          <h2 className={`py-2`}>Which god will you serve?</h2>
          <p>Will you seek out the Prince of Pleasure?</p>
          <div className="my-4">
            <Button
              buttonText="Shop Hedonites of Slaanesh"
              handleClick={() => {
                if (targetRef.current) {
                  targetRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
      <div ref={targetRef}>
        <ItemContainer cartSend={cartSend} />
      </div>
    </main>
  );
}
