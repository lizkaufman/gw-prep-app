"use client";
import React from "react";
import Button from "./Button";
import styles from "../styles/footer.module.css";
import Image from "next/image";
import logo from "../images/Games_Workshop_logo.svg";

const Footer = () => {
  return (
    <footer className={`${styles.footer} flex flex-column align-center py-5`}>
      <h2 className={`py-2 text-left`}>More Warhammer, more often</h2>
      <p className={`body-text text-center px-5 py-2 text-left`}>
        Enter your email to get the very latest news, promotions, hobby tips and
        more from Games Workshop. You can unsubscribe at any time.
      </p>
      <p className={`body-text text-center px-5 py-2 text-left`}>
        By subscribing you confirm that you are over the age of 13 or have
        consent from your parent or guardian to subscribe.
      </p>
      <form className={`my-3 ${styles.emailSignup}`}>
        <input
          className={`py-2 px-5`}
          placeholder="Email address"
          type="email"
          maxLength={75}
        />{" "}
        {/* <button className={`py-2 px-2 ${styles.emailSignupButton}`}>
          Subscribe
        </button> */}
        <Button
          buttonText="Subscribe"
          handleClick={(e) => {
            e?.preventDefault();
            console.log("Email subscribe button");
          }}
        />
      </form>
      <span className={`${styles.footerDivider} my-2`}></span>
      <div className={`${styles.footerLinks} py-5`}>
        <div className={`${styles.footerLinksSection} flex flex-column`}>
          <h3 className={styles.footerLinksHeader}>Support</h3>
          <a className={`py-1`}>Find Your Store</a>
          <a className={`py-1`}>Contact Us</a>
          <a className={`py-1`}>Delivery and Returns</a>
          <a className={`py-1`}>Warhammer +</a>
        </div>
        <span className={`${styles.footerDividerMobile} my-4`}></span>
        <div className={`${styles.footerLinksSection} flex flex-column`}>
          <h3 className={styles.footerLinksHeader}>About Games Workshop</h3>
          <a className={`py-1`}>Jobs at Games Workshop</a>
          <a className={`py-1`}>Privacy Notice</a>
          <a className={`py-1`}>Modern Slavery Statment</a>
          <a className={`py-1`}>Cookies</a>
        </div>
        <span className={`${styles.footerDividerMobile} my-4`}></span>
      </div>
      <Image alt="Games Workshop logo" src={logo} width={200} />
    </footer>
  );
};

export default Footer;
