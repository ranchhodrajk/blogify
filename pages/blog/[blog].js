import React, { useState, useEffect } from "react";
import s from "../../styles/BlogDetail.module.scss";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { LIKEPOST } from "../../apollo/mutation/LikePost";
import { COMMENT_POST } from "../../apollo/mutation/CommentPost";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { showSignInModel } from "../../Reducers/showSignInModel";
import { GETPOST } from "../../apollo/query/getPost";
import { GET_TAG_POST } from "../../apollo/query/getTagPost";
import { DELETE_COMMENT } from "../../apollo/mutation/DeleteComment";

import {
  Row,
  Col,
  Button,
  Tabs,
  Affix,
  Tag,
  Empty,
  Spin,
  Tooltip,
  Comment,
  Avatar,
  Form,
  List,
  Input,
  Skeleton,
} from "antd";
import {
  HeartOutlined,
  InstagramFilled,
  LinkedinFilled,
  LinkOutlined,
  SaveOutlined,
  TwitterOutlined,
  MessageOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import NameBar from "../../components/NameBar/NameBar";
import SmallNine from "../../components/SmallNine/SmallNine";
import { getCookie } from "../../utilities/cookies";
import PopupSign from "../../components/PopupSign/PopupSign";

const { TextArea } = Input;

const blogDetail = ({ postId }) => {
  const dispatch = useDispatch();
  const { isShowModel } = useSelector((state) => state.signInModel);

  const { loading, error, data, refetch } = useQuery(GETPOST, {
    variables: { postId },
  });

  const { loading: tagLoading, error: tagError, data: tagData } = useQuery(
    GET_TAG_POST,
    {
      variables: { tag: data?.getPost?.tags?.name },
    }
  );

  const [
    deleteComment,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_COMMENT);

  console.log("My test tag data", tagData);

  console.log("My post data for commenting", data);

  const [
    likePost,
    { data: likeData, loading: likeLoading, error: likeError },
  ] = useMutation(LIKEPOST);

  const [
    createComment,
    { data: commentData, loading: commentLoading, error: commentError },
  ] = useMutation(COMMENT_POST);

  const [isLike, setisLike] = useState();
  const [isToken, setisToken] = useState();
  const [userLocalName, setuserLocalName] = useState();
  const [comments, setcomments] = useState([]);
  const [submitting, setsubmitting] = useState(false);
  const [value, setvalue] = useState("");

  useEffect(() => {
    setcomments(data?.getPost?.comments);
  }, [data]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setsubmitting(true);

    createComment({
      variables: { postId: postId, body: value },
    })
      .then(
        (value) => (
          setsubmitting(false),
          setvalue(""),
          console.log("comment Done", value),
          refetch()
        )
      )
      .catch(
        (error) => (
          setsubmitting(false),
          dispatch(showSignInModel(!isShowModel)),
          setvalue(""),
          console.log("comment err", error),
          refetch()
        )
      );
  };

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  const onClickDelete = (commentId) => {
    console.log("Commentid ", commentId);

    deleteComment({
      variables: { postId: postId, commentId: commentId },
    })
      .then((value) => console.log("Comment delete done", value))
      .catch((error) => console.log("Comment delete err", error));
  };

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments?.length} ${
        comments?.length > 1 ? "comments" : "comment"
      }`}
      itemLayout="horizontal"
      renderItem={(item) => (
        <Comment
          actions={item.actions}
          author={
            <div className={s.commentListMain}>
              <div className={s.commentName}>{item.username}</div>
              {userLocalName === item.username ? (
                <div className={s.commentDelete}>
                  <DeleteOutlined onClick={() => onClickDelete(item.id)} />
                </div>
              ) : null}
            </div>
          }
          avatar="https://i.pravatar.cc/"
          content={item.body}
          datetime={item.created_at}
        />
      )}
    />
  );

  function checkLike(userName) {
    return data?.getPost?.likes?.some(function (el) {
      return el?.username === userName;
    });
  }

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setisLike(checkLike(userName));
    setuserLocalName(userName);
    const getToken = getCookie("token");
    setisToken(getToken);
  }, [data]);

  const onClickLike = (postId) => {
    likePost({
      variables: { postId: postId },
    })
      .then((value) => console.log("like value", value))
      .catch((error) => dispatch(showSignInModel(!isShowModel)));
  };

  const onClickComment = () => {
    const getToken = getCookie("token");

    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);

    if (getToken === null || isLoggin === null) {
      dispatch(showSignInModel(!isShowModel));
    }
  };

  return (
    <div className={s.mainBlogDetailContainer}>
      <Head>
        <title>Blogify | Blog Detail</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <div className={`${s.loadDiv} mySpinCustom`}>
          <Spin size="large" />
        </div>
      ) : (
        <Row justify="center">
          {isShowModel ? <PopupSign /> : ""}
          <Col xs={20}>
            <Row gutter={30}>
              <Col lg={16}>
                <div className={s.userDetail}>
                  <Row align="middle">
                    <Col md={12}>
                      <div className={s.userDetailCol}>
                        <div className={s.profile}>
                          <img src="https://i.pravatar.cc/" alt="" />
                        </div>
                        <div className={s.detail}>
                          <div className={s.userName}>
                            {data?.getPost?.username}
                          </div>
                          <div className={s.create}>
                            <div className={s.date}>
                              {moment(data?.getPost?.created_at).format(
                                "MMMM Do YYYY"
                              )}
                            </div>
                            <div className={s.dot}>&#9679;</div>
                            <div className={s.time}>
                              {Math.floor(Math.random() * 10) + 1} Min read
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className={s.userSocial}>
                        <div className={s.social}>
                          <button className={s.icon}>
                            <TwitterOutlined style={{ fontSize: "20px" }} />
                          </button>
                          <button className={s.icon}>
                            <InstagramFilled style={{ fontSize: "20px" }} />
                          </button>
                          <button className={s.icon}>
                            <LinkedinFilled style={{ fontSize: "20px" }} />
                          </button>
                          <button className={s.icon}>
                            <LinkOutlined style={{ fontSize: "20px" }} />
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={s.blogDetails}>
                  <div className={s.blogHead}>
                    {data?.getPost?.title?.length < 10 ||
                    data?.getPost?.title === null
                      ? `Now our blog's title is null so its a default title`
                      : data?.getPost?.title}
                  </div>
                  <div className={s.blogSubDes}>
                    {data?.getPost?.body?.length < 80
                      ? `Our data's lenth is less then 20 so its default data Our data's lenth is less then 20 so its default data Our data's lenth is less then 20 so its default data Our data's lenth is less then 20 so its default data`
                      : data?.getPost?.body?.length > 200
                      ? data?.getPost?.body?.slice(0, 270)
                      : data?.getPost?.body}
                  </div>
                  <div className={s.blogImg}>
                    <div className={s.imgClass}>
                      <Image
                        src={`/Assets/blog${
                          Math.floor(Math.random() * 10) + 1
                        }.jpg`}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className={s.blogFullDes}>
                    <div className={s.blogFullDesBox}>
                      <div className={s.blogFullDesBoxFisrt}>
                        {data?.getPost?.body?.charAt(0)?.toUpperCase() +
                          data?.getPost?.body?.slice(1)}
                      </div>
                    </div>
                    <div className={s.blogFullDesBox}>
                      Gorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus labore laudantium harum ipsa pariatur sint facere
                      ipsum quae mollitia, est dolorem non minima commodi
                      voluptas voluptate culpa quidem quod veritatis.
                    </div>
                    <div className={s.blogFullDesBox}>
                      Uorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus labore laudantium harum ipsa pariatur sint facere
                      ipsum quae mollitia, est dolorem non minima commodi
                      voluptas voluptate culpa quidem quod veritatis.m quae
                      mollitia, est dolorem non minima commodi voluptas
                      voluptate culpa quidem quod veritatis.
                    </div>
                    <div className={s.blogFullDesBox}>
                      Porem ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus labore laudantium harum ipsa pariatur sint facere
                      ipsum quae mollitia, est dolorem non minima commodi
                      voluptas voluptate culpa quidem quod veritatis.Ducimus
                      labore laudantium harum ipsa pariatur sint facere ipsum
                      quae mollitia, est dolorem non minima commodi voluptas
                      voluptate culpa quidem quod veritatis.
                    </div>
                    <div className={s.blogFullDesBox}>
                      Norem ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus labore laudantium harum ipsa pariatur sint facere
                      ipsum quae mollitia, est dolorem non minima commodi
                      voluptas voluptate culpa quidem quod veritatis.
                    </div>
                  </div>
                  <div className={s.likeComment}>
                    <div className={s.readmore}>
                      <div className={s.like}>
                        <div className={s.likeSym}>
                          {isLike && isToken ? (
                            <div className="redHeart">
                              <Tooltip title="Unlike">
                                <HeartFilled
                                  onClick={() => onClickLike(data?.getPost?.id)}
                                />
                              </Tooltip>
                            </div>
                          ) : (
                            <Tooltip title="Like">
                              <HeartOutlined
                                onClick={() => onClickLike(data?.getPost?.id)}
                              />
                            </Tooltip>
                          )}
                        </div>
                        <div className={s.likeCount}>
                          {data?.getPost?.likeCount}
                        </div>
                      </div>
                      <div className={s.comment}>
                        <div className={s.commentSym}>
                          <Tooltip title="Comment">
                            <MessageOutlined onClick={() => onClickComment()} />
                          </Tooltip>
                        </div>
                        <div className={s.commentCount}>
                          {data?.getPost?.commentCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={s.commentBox}>
                    {comments?.length > 0 && (
                      <CommentList comments={comments} />
                    )}
                    <Comment
                      avatar={
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <>
                          <Form.Item>
                            <TextArea
                              rows={4}
                              onChange={handleChange}
                              value={value}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              loading={submitting}
                              disabled={value.length > 1 ? false : true}
                              onClick={handleSubmit}
                              type="primary"
                            >
                              Add Comment
                            </Button>
                          </Form.Item>
                        </>
                        // <Editor
                        //   onChange={handleChange}
                        //   onSubmit={handleSubmit}
                        //   submitting={submitting}
                        //   value={value}
                        // />
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className={s.mainRightMid}>
                  <Affix offsetTop={80}>
                    <div className={s.nameBar}>
                      <NameBar name="Related blogs" isView={false} />
                    </div>
                    <div className={s.containt}>
                      {tagLoading ? (
                        <Skeleton avatar paragraph={{ rows: 1 }} />
                      ) : (
                        <div className={s.scrollContainer}>
                          {tagData?.getTagPosts.length > 0 ? (
                            tagData?.getTagPosts?.map((item) => (
                              <SmallNine
                                id={item?.id}
                                imgPath="/Assets/first1.jpg"
                                title={
                                  item?.title ? item?.title : "Title is default"
                                }
                                user={
                                  item?.username ? item?.username : "Alvero"
                                }
                                date={item?.created_at}
                              />
                            ))
                          ) : (
                            <Empty />
                          )}
                        </div>
                      )}
                    </div>
                  </Affix>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default blogDetail;

export async function getServerSideProps(context) {
  const { blog } = context.query;

  return {
    props: {
      postId: blog,
    },
  };
}
