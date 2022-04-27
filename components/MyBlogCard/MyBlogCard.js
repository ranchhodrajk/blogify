import React, { useState, useEffect } from "react";
import s from "../../styles/MyBlogCard.module.scss";
import { Row, Col, Tooltip, Spin, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { LIKEPOST } from "../../apollo/mutation/LikePost";
import { useSelector, useDispatch } from "react-redux";
import { showSignInModel,showDeleteModel,setDeletePostId } from "../../Reducers/showSignInModel";

import {
  ClockCircleOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
  MessageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getCookie } from "../../utilities/cookies";
import { useRouter } from "next/router";
const MyBlogCard = ({
  id,
  index,
  title,
  body,
  created_at,
  likeCount,
  commentCount,
  userName,
  likeArr,
}) => {
  console.log("likeArr", likeArr);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isShowModel,isDeleteModel } = useSelector((state) => state.signInModel);

  const [isLike, setisLike] = useState();
  const [isToken, setisToken] = useState();
  const [isLogin, setisLogin] = useState();
  
  const [
    likePost,
    { data: likeData, loading: likeLoading, error: likeError },
  ] = useMutation(LIKEPOST);

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
  });

  const onClickLike = (postId) => {
    console.log("asdsdsd like", postId);
    console.log("isLikeisLikeisLike", isLike);
    console.log("isTokenisToken", isToken);

    likePost({
      variables: { postId: postId },
    })
      .then((value) => console.log("like value", value))
      .catch((error) => dispatch(showSignInModel(!isShowModel)));
  };

  const onClickComment = (postId) =>{
      router.push(`blog/${postId}`)
  }

  const onClickPopDelete = (postId)=> {
    dispatch(showDeleteModel(!isDeleteModel))
    dispatch(setDeletePostId(postId))

  }

  return (
    <div className={s.mainMyBlogCardContainer}>
       
        <div className={s.oneWrap}>
          <Row gutter={30} align="middle">
            <Col md={12} xs={24} order={index % 2 === 0 ? 1 : 2}>
              <div className={s.left}>
                <div className={s.imgDark}></div>
                <div className={s.imgClass}>
                  <Image
                    src={`/Assets/first${index}.jpg`}
                    alt=""
                    layout="fill"
                  />
                </div>
              </div>
            </Col>
            <Col md={12} xs={24} order={index % 2 === 0 ? 2 : 1}>
              <div className={s.right}>
                <div className={s.rightTitle}>
                  <Link href={`blog/${id}`}>
                    <a>{title?.charAt(0)?.toUpperCase() + title?.slice(1)}</a>
                  </Link>
                </div>
                <div className={s.group}>
                  <div className={s.createDate}>
                    <ClockCircleOutlined
                      style={{
                        color: "grey",
                        fontSize: "14px",
                      }}
                    />
                    <div className={s.simple}>Blog publised on</div>
                    <div className={s.timebox}></div>
                    {moment(created_at).format("MMMM Do YYYY")}
                  </div>
                </div>
                <div className={s.des}>
                  {body?.length < 100
                    ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, quos dolorum. Cum rem voluptas, ut id, delectus vero minima, sapiente hic explicabo exercitationem placeat tenetur? Nobis eius maiores iure non facilis a, illo accusantium adipisci rem deleniti, illum id eos. Nobis eius maiores iure non facilis a, illo accusantium adipiscirem deleniti, illum id eos.Nobis eius maiores iure non facilis a, illo accusantium adipiscirem deleniti, illum id eos."
                    : body?.length >= 300
                    ? body?.slice(0, 450) + "..."
                    : body}
                </div>
                <div className={s.readmore}>
                  <div className={s.grow}>
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
                          <MessageOutlined onClick={()=>onClickComment(id)}/>
                        </Tooltip>
                      </div>
                      <div className={s.commentCount}>{commentCount}</div>
                    </div>
                  </div>
                  <div className={s.delete}>
                    <Tooltip title="Delete">
                      <DeleteOutlined onClick={()=>onClickPopDelete(id)} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
    </div>
  );
};

export default MyBlogCard;
