import React, { useEffect, useState } from "react";
import s from "../../styles/Layout.module.scss";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useRouter } from "next/router";
import { Affix } from "antd";
import signIn from "../../pages/signIn";
import { useSelector, useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const { isNav } = useSelector((state) => state.navbar);

  const [top, setTop] = useState(0);
  const router = useRouter();
  const [islog, setislog] = useState();

  useEffect(() => {
    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);
    setislog(isLoggin);
  }, []);

  useEffect(() => {
    if (islog === false) {
      router.push("signIn");
    }
  }, [islog]);

  return (
    <div className={s.layoutMain}>
      <div>
        <Affix offsetTop={top}>
          <NavBar />
        </Affix>
      </div>
      <div className={s.middleLayout} key={Math.random()}>
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
