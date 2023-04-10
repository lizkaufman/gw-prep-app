import styles from "../styles/layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
