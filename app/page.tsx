import { Source_Serif_Pro, Open_Sans } from "next/font/google";
import styles from "./styles/page.module.css";

// const noto_serif = Noto_Serif({ weight: "400", subsets: ["latin"] });
const source_serif_pro = Source_Serif_Pro({
  weight: "600",
  subsets: ["latin"],
});
const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={styles.main}>main</main>
    </>
  );
}
