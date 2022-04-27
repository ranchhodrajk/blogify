import React from "react";
import s from "../../styles/BackBlogCard.module.scss";

import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { Tag, Skeleton } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";

const BackBlogCard = ({
  id,
  imgPath,
  title,
  user,
  date,
  category,
  loading,
}) => {
  return (
    <div className={s.cardMain}>
      <Link href={`blog/${id}`}>
        <a>
        <div className={s.bgDark}></div>
        <div className={s.cardImg}>
          <Image src={imgPath} alt="" layout="fill" />
        </div>
        <div className={s.detail}>
          {loading ? (
            <Skeleton active />
          ) : (
            <div>
              <div className={s.category}>
                <Tag style={{ background: "transparent", color: "white" }}>
                  {category}
                </Tag>
              </div>
              <div className={s.title}>
                {/* <Link href="/404"> */}
                  {title?.charAt(0)?.toUpperCase() + title?.slice(1)}
                {/* </Link> */}
              </div>
              <div className={s.group}>
                <div className={s.userName}>
                  <UserOutlined
                    style={{
                      color: "rgba(228, 228, 228, 0.87)",
                      fontSize: "14px",
                    }}
                  />{" "}
                  {user}
                </div>
                <div className={s.createDate}>
                  <ClockCircleOutlined
                    style={{
                      color: "rgba(228, 228, 228, 0.87)",
                      fontSize: "14px",
                    }}
                  />{" "}
                  {moment(date).format("MMMM Do YYYY")}
                </div>
              </div>
            </div>
          )}
        </div>
        </a>
      </Link>
    </div>
  );
};

export default BackBlogCard;
