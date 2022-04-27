import {
  ClockCircleOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Row, Col, Tooltip, Spin, Empty, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NameBar from "../../components/NameBar/NameBar";
import s from "../../styles/MyBlog.module.scss";
import { useQuery } from "@apollo/client";
import { GET_USER_POST } from "../../apollo/query/getUserPosts";
import { getCookie } from "../../utilities/cookies";
import { useSelector } from "react-redux";

import MyBlogCard from "../../components/MyBlogCard/MyBlogCard";
import PopupDelete from "../../components/PopupDelete/PopupDelete";

const myBlog = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_POST);

  const { isDeleteModel } = useSelector((state) => state.signInModel);

  const [isLike, setisLike] = useState();
  const [isToken, setisToken] = useState();
  const [username, setusername] = useState();

  console.log("getUserPost", data);

  useEffect(() => {
    refetch();
  }, []);

  const sendRefetch = () => {
    refetch();
  };

  return (
    <div className={s.mainMyBlogContainer}>
      {loading ? (
        <div className={`${s.loadDiv} mySpinCustom`}>
          <Spin size="large" />
        </div>
      ) : (
        <Row justify="center" align="middle">
          {isDeleteModel ? <PopupDelete reftch={sendRefetch} /> : null}
          <Col xs={20}>
            <div className={s.head}>
              <div className={s.headMain}>YOUR BLOGS</div>
              <div className={s.headSub}>
                Space where your own thoughts are stored
              </div>
            </div>
            {data?.getUserPost?.length > 0 ? (
              data?.getUserPost?.map((item, index) => (
                <MyBlogCard
                  id={item?.id}
                  index={index}
                  title={item?.title}
                  body={item?.body}
                  created_at={item?.created_at}
                  likeCount={item?.likeCount}
                  commentCount={item?.commentCount}
                  userName={item?.username}
                  key={index}
                  likeArr={item?.likes}
                  token={isToken}
                />
              ))
            ) : (
              <div className={s.emptyBox}>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span style={{color:'grey'}}>
                      Nothig to show
                    </span>
                  }
                >
                  <Link href="writeBlog">
                    <a>
                    
                    <Button type="danger" shape="round">Create Blog</Button>
                    </a>
                  </Link>
                </Empty>
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default myBlog;
