import React, { useEffect, useState } from "react";
import s from "../../styles/NavBar.module.scss";

import ActiveLink from "../ActiveLink/ActiveLink";
import Link from "next/link";
import { Row, Col, Popover, Affix } from "antd";
import { Button } from "antd";
import { useDispatch } from "react-redux";

import { setCookie, getCookie } from "../../utilities/cookies";
import UserProfile from "../UserProfile/UserProfile";

const NavBar = () => {

  const [islog, setislog] = useState();
  const [isToken, setisToken] = useState();

  useEffect(() => {
    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);
    setislog(isLoggin);

    const getToken = getCookie("token");
    setisToken(getToken);
  });

  

  // const content = (

  // );

  return (
    <div className={s.mainNavBar}>
      <Row justify="center">
        <Col xs={22}>
          <div className={s.navBar}>
            <div className={s.logo}>
              <Link href="/">
                <a>
                  <img src="/Assets/logoDark.png" alt="" height="30px" />
                  <div className={s.name}>logify</div>
                </a>
              </Link>
            </div>
            <div className={s.menu}>
              <div className={s.menuItem}>
                <ActiveLink href="/">Home</ActiveLink>
              </div>
              <div className={s.menuItem}>
                <ActiveLink href="/blog">Blog</ActiveLink>
              </div>
              <div className={s.menuItem}>
                <ActiveLink href="/ourStory">Our story</ActiveLink>
              </div>
              <div className={s.menuItem}>
                <ActiveLink href="/contact">Contact us</ActiveLink>
              </div>
              {islog && isToken ? (
                <Popover
                  placement="bottomRight"
                  content={<UserProfile />}
                  trigger="click"
                >
                  <div className={s.menuItem}>
                    <Button
                      type="text"
                      style={{ fontSize: "16px", background: "transparent" }}
                    >
                      Profile
                    </Button>
                  </div>
                </Popover>
              ) : (
                <div className={s.menuBtn}>
                  <div className={s.menuItem}>
                    <ActiveLink href="/signIn">Sign In</ActiveLink>
                  </div>
                  <div className={s.menuItem}>
                    <ActiveLink href="/signUp">
                      <Button type="primary" danger shape="round">
                        Sign Up
                      </Button>
                    </ActiveLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
