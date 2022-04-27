import React from "react";
import s from "../../styles/SmallOne.module.scss";

import Link from "next/link";
import moment from "moment";
import Image from "next/image";

import { Row, Col, Button } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";

const SmallOne = ({ id, imgPath, title, user, date }) => {
  return (
    <div className={s.smallOneConatiner}>
      <Row>
        <Col xs={6}>
          <div className={s.upper}>
            <Link href={`blog/${id}`}>
              <a>
                <div className={s.imgDark}></div>
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
                <UserOutlined style={{ color: "grey", fontSize: "13px" }} />{" "}
                {user?.charAt(0)?.toUpperCase() + user?.slice(1)}
              </div>
              <div className={s.createDate}>
                <ClockCircleOutlined
                  style={{ color: "grey", fontSize: "12px" }}
                />{" "}
                {moment(date).format("MMMM Do YYYY")}
              </div>
            </div>
            <div className={s.readmore}>
              <Link href={`blog/${id}`}>
                <a>
                  <Button
                    danger
                    type="text"
                    style={{ textAlign: "start", padding: "0px" }}
                  >
                    Read more
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SmallOne;
