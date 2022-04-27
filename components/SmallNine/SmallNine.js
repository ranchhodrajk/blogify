import React from "react";
import s from "../../styles/SmallNine.module.scss";

import Link from "next/link";
import moment from "moment";
import Image from "next/image";

import { Row, Col, Button } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
const SmallNine = ({ id, imgPath, title, user, date }) => {
  return (
    <div className={s.mainSmallNine}>
      <div className={s.smallOneConatiner}>
        <Row>
          <Col xs={6}>
            <div className={s.upper}>
              <Link href={`blog/${id}`}>
                <a>
                  <div className={s.bgDark}></div>
                  <div className={s.imageNext}>
                    <Image src={imgPath} alt="" layout="fill" />
                  </div>
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={18}>
            <div className={s.detail}>
              <div className={s.title}>
                <Link href={`blog/${id}`}>
                  <a>{title?.charAt(0)?.toUpperCase() + title?.slice(1)}</a>
                </Link>
              </div>
              <div className={s.group}>
                <div className={s.userName}>
                  <UserOutlined style={{ color: "grey", fontSize: "14px" }} />{" "}
                  {user?.charAt(0)?.toUpperCase() + user?.slice(1)}
                </div>
                <div className={s.createDate}>
                  <ClockCircleOutlined
                    style={{ color: "grey", fontSize: "14px" }}
                  />{" "}
                  {moment(date).format("MMMM Do YYYY")}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SmallNine;
