import React, { useEffect } from "react";
import { Affix, Button, Skeleton } from "antd";
import s from "../../styles/UserProfile.module.scss";
import { setCookie } from "../../utilities/cookies";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETUSER } from "../../apollo/query/getUser";
import moment from "moment";
import {
  EditOutlined,
  PicRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const UserProfile = () => {
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(GETUSER);

  useEffect(() => {
    refetch();
  }, []);

  console.log("userData", data);

  const onClickSignOut = (e) => {
    setCookie("token", "", -1);
    localStorage.removeItem("isLoggin");
    localStorage.removeItem("userName");
    router.push("/");
  };

  return (
    <Affix offsetTop={64}>
      <div className={s.profileContaint}>
        <div className={s.upper}>
          <div className={s.upperAbso}>
            <div className={s.upperName}>
              {data?.getUser?.length > 0
                ? data?.getUser[0]?.username
                : "Username"}
            </div>
            <div className={s.upperProfile}>
              <img src="https://i.pravatar.cc/" alt="" />
            </div>
          </div>
        </div>
        <div className={s.lower}>
          <div className={s.lowerEmail}>
            {data?.getUser?.length > 0
              ? data?.getUser[0]?.email
              : "abc@gmail.com"}
          </div>
          <div className={s.lowerDate}>{`Join from  ${
            data?.getUser?.length > 0
              ? moment(data?.getUser[0]?.created_at).format("MMMM Do YYYY")
              : "June 1st 2021"
          }`}</div>

          <div className={s.profileList}>
            <Link href="/blog/">
              <a>
                <div className={s.myProfile}>
                  <div className={s.myProfileIcon}>
                    <UserOutlined />
                  </div>
                  <div className={s.myProfileLabel}>My Profile</div>
                </div>
              </a>
            </Link>

            <Link href="/myBlog/">
              <a>
                <div className={s.myProfile}>
                  <div className={s.myProfileIcon}>
                    <PicRightOutlined />
                  </div>
                  <div className={s.myProfileLabel}>My Blogs</div>
                </div>
              </a>
            </Link>

            <Link href="/writeBlog/">
              <a>
                <div className={s.myProfile}>
                  <div className={s.myProfileIcon}>
                    <EditOutlined />
                  </div>
                  <div className={s.myProfileLabel}>Write Blogs</div>
                </div>
              </a>
            </Link>
          </div>

          <div className={s.lowerBtn}>
            <Button
              type="primary"
              danger
              shape="round"
              onClick={onClickSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </Affix>
  );
};

export default UserProfile;
