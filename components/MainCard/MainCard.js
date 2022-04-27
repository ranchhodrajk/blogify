import React, { useState, useEffect } from "react";
import s from "../../styles/MainCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { setCookie, getCookie } from "../../utilities/cookies";
import { useMutation } from "@apollo/client";
import { LIKEPOST } from "../../apollo/mutation/LikePost";
import { Row, Col, Button, Tooltip } from "antd";

import { showSignInModel } from "../../Reducers/showSignInModel";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import {
  UserOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
} from "@ant-design/icons";
import PopupSign from "../PopupSign/PopupSign";

const MainCard = ({
  sideImage,
  id,
  title,
  user,
  date,
  description,
  likeCount,
  commentCount,
  userName,
  likeArr,
}) => {
  const [likePost, { data, loading, error }] = useMutation(LIKEPOST);
  const dispatch = useDispatch();
  const { isShowModel } = useSelector((state) => state.signInModel);

  const router = useRouter();
  const [isLike, setisLike] = useState();
  const [isToken, setisToken] = useState();
  const [isLogin, setisLogin] = useState();

  function checkLike(userName) {
    return likeArr.some(function (el) {
      return el.username === userName;
    });
  }

  useEffect(() => {
    setisLike(checkLike(userName));

    const getToken = getCookie("token");
    setisToken(getToken);

    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);
    setisLogin(isLoggin);
  }, []);

  const onClickLike = (postId) => {
    // console.log("postId", postId);

    likePost({
      variables: { postId: postId },
    })
      .then((value) => console.log("like value", value))
      .catch((error) => dispatch(showSignInModel(!isShowModel)));
  };

  const onClickComment = (postId) => {
    if (isLogin && isToken) {
      router.push(`blog/${postId}`);
    } else {
      dispatch(showSignInModel(!isShowModel));
    }
  };

  return (
    <div className={s.cardContainer}>
      <Row gutter={30} align="middle">
        <Col md={12} xs={24}>
          <div className={s.left}>
            <div className={s.imgDark}></div>
            <div className={s.imgClass}>
              <Image src={sideImage} alt="" layout="fill" />
            </div>
          </div>
        </Col>
        <Col md={12} xs={24}>
          <div className={s.right}>
            <div className={s.rightTitle}>
              <Link href={`blog/${id}`}>
                <a>
                  {title?.length > 35
                    ? title?.slice(0, 35) + "..."
                    : title?.charAt(0)?.toUpperCase() + title?.slice(1)}
                </a>
              </Link>
            </div>
            <div className={s.group}>
              <div className={s.userName}>
                <UserOutlined
                  style={{
                    color: "grey",
                    fontSize: "14px",
                  }}
                />{" "}
                {user?.charAt(0)?.toUpperCase() + user?.slice(1)}
              </div>
              <div className={s.createDate}>
                <ClockCircleOutlined
                  style={{
                    color: "grey",
                    fontSize: "14px",
                  }}
                />{" "}
                {moment(date).format("MMMM Do YYYY")}
              </div>
            </div>
            <div className={s.des}>
              {description?.length < 50
                ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta culpa delectus nobis quod suscipit, assumenda vero magni natus quisquam minima molestiae nesciunt saepe veritatis eum facilis? Facere asperiores fuga aliquid."
                : description?.length >= 100
                ? description?.slice(0, 250) + "..."
                : description}
            </div>
            <div className={s.readmore}>
              <div className={s.like}>
                <div className={s.likeSym}>
                  {isLike && isToken ? (
                    <div className="redHeart">
                      <Tooltip title="Unlike">
                        <HeartFilled onClick={() => onClickLike(id)} />
                      </Tooltip>
                    </div>
                  ) : (
                    <Tooltip title="Like">
                      <HeartOutlined onClick={() => onClickLike(id)} />
                    </Tooltip>
                  )}
                </div>
                <div className={s.likeCount}>{likeCount}</div>
              </div>
              <div className={s.comment}>
                <div className={s.commentSym}>
                  <Tooltip title="Comment">
                    <MessageOutlined onClick={() => onClickComment(id)} />
                  </Tooltip>
                </div>
                <div className={s.commentCount}>{commentCount}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainCard;
