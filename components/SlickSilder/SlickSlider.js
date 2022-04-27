import React, { useState, useEffect } from "react";
import s from "../../styles/SlickSlider.module.scss";

import Slider from "react-slick";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { Row, Col } from "antd";

import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";

const SlickSlider = ({ data }) => {
  const topTen = data?.getPosts?.slice(10, 20);

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div className={s.slickContainer}>
      <div>
        <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
          {topTen?.map((item, index) => (
            <div className={s.slickImg} key={Math.random()}>
              <Link href={`blog/${item?.id}`}>
                <a>
                  <div className={s.bgdark}></div>
                  <div className={s.imgNext}>
                    <Image
                      src={`/Assets/first${index}.jpg`}
                      alt=""
                      layout="fill"
                    />
                  </div>
                  <div className={s.slickdetail}>
                    <div className={s.slickTitle}>
                      {item?.body?.substring(0, 40).charAt(0).toUpperCase() +
                        item?.body?.substring(0, 40).slice(1)}
                    </div>
                    <div className={s.group}>
                      <div className={s.userName}>
                        <UserOutlined
                          style={{
                            color: "rgba(228, 228, 228, 0.87)",
                            fontSize: "14px",
                          }}
                        />{" "}
                        {item?.username}
                      </div>
                      <div className={s.createDate}>
                        <ClockCircleOutlined
                          style={{
                            color: "rgba(228, 228, 228, 0.87)",
                            fontSize: "14px",
                          }}
                        />{" "}
                        {moment(item?.created_at).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </Slider>

        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {topTen?.map((item, index) => (
            <div className={s.slickImgBotMain} key={Math.random()}>
              <div className={s.slickImgBot}>
                <div className={s.bgDark}></div>
                <div className={s.imgNext}>
                  <Image
                    src={`/Assets/first${index}.jpg`}
                    alt=""
                    style={{ marginRight: "10px" }}
                    className="slickImg"
                    layout="fill"
                  />
                </div>
              </div>
              <div className={s.slickdetailBot}>
                <Link href={`blog/${item?.id}`}>
                  <a>
                    {item?.body?.charAt(0)?.toUpperCase() +
                      item?.body?.slice(1)}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
