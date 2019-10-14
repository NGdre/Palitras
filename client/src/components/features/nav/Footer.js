import React from "react";
import { websiteDomain } from "../../../setupEnv";

const Footer = () => {
  return (
    <footer>
      <div className="footer-item">
        <p> &copy; {websiteDomain}</p>
      </div>
      <div className="footer-item">
        <a href="/terms" className="link">
          Terms
        </a>
      </div>
      <div className="footer-item">
        <a href="/privacy" className="link">
          Privacy
        </a>
      </div>
      <div className="footer-item">
        <div className="socials">
          <a href="https://github.com/100stepstosuccess">
            <img src="/images/github-logo.svg" alt="github" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
