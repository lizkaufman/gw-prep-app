import { Source_Serif_Pro, Open_Sans } from "next/font/google";
import Image from "next/image";

import styles from "./styles/page.module.css";
import heroImage from "./images/hero-image.webp";

import ItemContainer from "./components/itemCards/ItemContainer";

// const noto_serif = Noto_Serif({ weight: "400", subsets: ["latin"] });
const source_serif_pro = Source_Serif_Pro({
  weight: "600",
  subsets: ["latin"],
});
const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main
        className={`${styles.main} flex flex-column justify-center align-center justify-space-between`}
      >
        <div
          className={`${styles.ctaContainer} px-4 flex flex-column justify-space-between align-center`}
        >
          <Image
            src={heroImage}
            alt="lord of hubris and realmgore ritualist models"
            width={1300}
          />
          <div className={`${styles.textOverlay} px-2`}>
            <h2 className={`py-2`}>Which god will you serve?</h2>
            <p>
              Will you follow the Blood God or seek out the Prince of Pleasure?
            </p>
            <button
              className={`${styles.ctaButton} py-2 px-3 my-3`}
            >{`Shop new Chaos models`}</button>
          </div>
        </div>
        <ItemContainer />
      </main>
    </>
  );
}
