import React from "react";
import styles from "../styles/footer.module.css";
import Image from "next/image";
import logo from "../images/Games_Workshop_logo.svg";

const Footer = () => {
  return (
    <footer className={`${styles.footer} flex flex-column align-center py-5`}>
      <h2 className={`py-2`}>More Warhammer, more often</h2>
      <p className={`body-text text-center px-5 `}>
        Enter your email to get the very latest news, promotions, hobby tips and
        more from Games Workshop. You can unsubscribe at any time.
      </p>
      <p className={`body-text text-center px-5 py-2 `}>
        By subscribing you confirm that you are over the age of 13 or have
        consent from your parent or guardian to subscribe.
      </p>
      <form className={`my-3`}>
        <input
          className={`py-2 px-4`}
          placeholder="Email address"
          type="email"
          maxLength={75}
        />{" "}
        <button className={`py-2 px-2`}>Subscribe</button>
      </form>
      <div className={`${styles.footerLinks}`}>
        <span className={`${styles.footerDivider} my-4`}></span>
        <div className={`flex flex-column`}>
          <h3 className={styles.footerLinksHeader}>Support</h3>
          <a className={`py-1`}>Find Your Store</a>
          <a className={`py-1`}>Contact Us</a>
          <a className={`py-1`}>Delivery and Returns</a>
          <a className={`py-1`}>Warhammer +</a>
        </div>
        <span className={`${styles.footerDivider} my-4`}></span>
        <div className={`flex flex-column`}>
          <h3 className={styles.footerLinksHeader}>About Games Workshop</h3>
          <a className={`py-1`}>Jobs at Games Workshop</a>
          <a className={`py-1`}>Privacy Notice</a>
          <a className={`py-1`}>Modern Slavery Statment</a>
          <a className={`py-1`}>Cookies</a>
        </div>
        <span className={`${styles.footerDivider} my-4`}></span>
      </div>
      <Image alt="Games Workshop logo" src={logo} width={200} />
    </footer>
  );
};

export default Footer;
