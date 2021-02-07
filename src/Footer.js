import React from "react";
import { Button, Divider } from "antd";

const Footer = () => {
  return (
    <>
      <Divider />
      <span>
        <Button type="text">© Kevin Jiang {new Date().getFullYear()}</Button>
        <Button type="link" href="https://impracticalhackers.devpost.com/">
          Made for Impractical Hackers
        </Button>
        <Button
          type="link"
          href="https://github.com/kevin51jiang/im-productive"
        >
          GitHub
        </Button>
        <Button type="link" href="https://kevinjiang.ca/">
          Contact me
        </Button>
      </span>
    </>
  );
};

export default Footer;
