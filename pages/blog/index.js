import React, { useState, useEffect } from "react";
import s from "../../styles/Blog.module.scss";

import { Row, Col, Affix, Tabs, Tag, Empty, Spin,Button } from "antd";
import { useQuery } from "@apollo/client";
import { GETPOSTS } from "../../apollo/query/getPosts";
import { useSelector } from "react-redux";

import Head from "next/head";
import moment from "moment";
import NameBar from "../../components/NameBar/NameBar";
import MainCard from "../../components/MainCard/MainCard";
import SmallNine from "../../components/SmallNine/SmallNine";
import SlickBlog from "../../components/SlickBlog/SlickBlog";
import PopupSign from "../../components/PopupSign/PopupSign";

const index = () => {
  const { loading, error, data } = useQuery(GETPOSTS);
  const { TabPane } = Tabs;

  const { isShowModel } = useSelector((state) => state.signInModel);

  console.log("blog data", data);

  const [todayData, settodayData] = useState([]);
  const [yesterdayData, setyesterdayData] = useState([]);
  const [userName, setuserName] = useState("");
  const [loadMore, setloadMore] = useState(7);
  const initialData = data?.getPosts?.slice(0, loadMore);
  const todayDate = new Date();
  const yesterdayDate = todayDate - 24 * 60 * 60 * 1000;

  function getDataByDate(array, date) {
    return array?.filter((val) => {
      return (
        moment(date)?.format("MMMM Do YYYY") ==
        moment(val.created_at)?.format("MMMM Do YYYY")
      );
    });
  }

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setuserName(userName);
  }, []);

  useEffect(() => {
    settodayData(getDataByDate(data?.getPosts, todayDate));
    setyesterdayData(getDataByDate(data?.getPosts, yesterdayDate));
  }, [data]);

  const onClickLoad = () => {
    setloadMore(loadMore + 7)
  }

  return (
    <div className={s.mainBogCotainer}>
      <Head>
        <title>Blogify | Bolg</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Assets/logoLight.png" />
      </Head>

      {loading ? (
        <div className={`${s.loadDiv} mySpinCustom`}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={s.oneWrap}>
          {isShowModel ? <PopupSign /> : ""}
          <Row>
            <Col md={24} >
              <div className={s.slickUpper}>
                <SlickBlog />
              </div>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22}>
              <Row gutter={30}>
                <Col lg={{span:16,order:'1'}} xs={{span:24,order:'2'}}>
                  <div className={s.fourthDetail}>
                    <div className={s.containt}>
                      {initialData?.map((item, index) => (
                        <div className={s.MainCard} key={Math.random()}>
                          <MainCard
                            sideImage={`/Assets/blog${
                              Math.floor(Math.random() * 10) + 1
                            }.jpg`}
                            id={item?.id}
                            title={
                              item?.title === null
                                ? item?.body?.substring(0, 40)
                                : item?.title?.substring(0.4)
                            }
                            user={item?.username}
                            date={item?.created_at}
                            description={item?.body}
                            likeCount={item?.likeCount}
                            commentCount={item?.commentCount}
                            userName={userName}
                            likeArr={item?.likes}
                          />
                        </div>
                      ))}
                      <div className={s.btnLoadMore}>
                          <Button
                            type="danger"
                            shape="round"
                            onClick={onClickLoad}
                          >
                            More blogs
                          </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={{span:8,order:'2'}} xs={{span:24,order:'1'}}>
                  <div className={s.mainRightTop}>
                    <Affix offsetTop={40}>
                      <div className={s.containt}>
                        <div className="customTab">
                          <Tabs defaultActiveKey="1">
                            <TabPane tab="Today" key="1">
                              <div className={s.scrollContainer}>
                                <Row>
                                  {todayData?.length !== 0 ? (
                                    todayData?.map((item) => (
                                      <Col xs={24} md={12} lg={24}>
                                        <div
                                          className={s.smallnine}
                                          key={Math.random()}
                                        >
                                          <SmallNine
                                            id={item?.id}
                                            imgPath={`/Assets/blog${
                                              Math.floor(Math.random() * 10) + 1
                                            }.jpg`}
                                            title={
                                              item?.title === null ||
                                              item?.title === undefined
                                                ? item?.body?.substring(0, 40)
                                                : item?.title?.substring(0, 40)
                                            }
                                            user={item?.username}
                                            date={item?.created_at}
                                          />
                                        </div>
                                      </Col>
                                    ))
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "478px",
                                      }}
                                    >
                                      <Empty />
                                    </div>
                                  )}
                                </Row>
                              </div>
                            </TabPane>
                            <TabPane tab="Yesterday" key="2">
                              <div className={s.scrollContainer}>
                                <Row>
                                  {yesterdayData?.length !== 0 ? (
                                    yesterdayData?.map((item) => (
                                      <Col xs={24} md={12} lg={24}>
                                        <div
                                          className={s.smallnine}
                                          key={Math.random()}
                                        >
                                          <SmallNine
                                            imgPath={`/Assets/blog${
                                              Math.floor(Math.random() * 10) + 1
                                            }.jpg`}
                                            title={item?.body?.substring(0, 40)}
                                            user={item?.username}
                                            date={item?.created_at}
                                          />
                                        </div>
                                      </Col>
                                    ))
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "478px",
                                      }}
                                    >
                                      <Empty />
                                    </div>
                                  )}
                                </Row>
                              </div>
                            </TabPane>
                          </Tabs>
                        </div>
                      </div>
                    </Affix>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default index;
