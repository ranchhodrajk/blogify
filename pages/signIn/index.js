import React, { useState, useEffect } from "react";
import s from "../../styles/SignIn.module.scss";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../apollo/mutation/Login";
import { Row, Col } from "antd";
import { useRouter } from "next/router";
import {setCookie,getCookie } from '../../utilities/cookies'
import {  useDispatch } from "react-redux"
import { showNav } from '../../Reducers/showNav'
import { Form, Input, Button, Checkbox, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  TwitterOutlined,
  GithubOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";

const signIn = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const [resErr, setresErr] = useState(loading);
  const [resData, setresData] = useState();
  const [isloading, setisloading] = useState(loading);

  useEffect(() => {
    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);

    const getToken = getCookie('token');

    if(isLoggin===true && getToken!==null){
      router.push("/")
    }
  }, [])

  const onFinish = (values) => {
    login({
      variables: { username: values.username, password: values.password },
    })
      .then(
        (value) => (
          setisloading(true),
          setresData(value?.data?.login),
          setCookie("token",value?.data?.login?.token,1), 
          localStorage.setItem("userName", value?.data?.login?.username),
          localStorage.setItem("isLoggin", true),
          router.push("/")
        )
      )
      .catch(
        (error) => (setisloading(false),
        setresErr(error.message),
        console.log("login err", error)
      ));
  };

  const onFinishFailed = (value)=>{
    console.log('onfinish fail',value);
  }

  return (
    <div className={s.mainSignIn}>
      <div className={s.mainLayer}>
        <Row className={s.mainRow}>
          <Col lg={8} className={s.colMainRow}>
            {/* <div className={s.signInLab}>
              <div className={s.labTxt}>SIGN IN</div>
            </div> */}

            <div className={s.colMainForm}>
              <div className={s.colMainFormLogo} >
                <Link href='/'>
                  <a >
                    <img src="/Assets/logoLight.png" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className={s.form}>
                <div className={s.errMes}>{resErr !== "" ? resErr : ""}</div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className="passCustome"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item className="passKeep">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item className="passCustome">
                    <Button
                      loading={isloading ? true : false}
                      block
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className={s.newReg}>
                <div className={s.newRegFP}>
                  <Link href="/">
                    <a>Forgot password?</a>
                  </Link>
                </div>
                <div className={s.newReglbl}>
                  New user?
                  <Link href="/signUp">
                    <a> Register</a>
                  </Link>
                </div>
              </div>
              <Divider style={{ color: "grey", fontSize: "12px" }}>OR</Divider>
              <div className={s.social}>
                <div className={s.socialBtn}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<GooglePlusOutlined />}
                    style={{ backgroundColor: "tomato", border: "none" }}
                  />
                </div>
                <div className={s.socialBtn}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<TwitterOutlined />}
                  />
                </div>
                <div className={s.socialBtn}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<GithubOutlined />}
                    style={{
                      backgroundColor: "black",
                      border: "none",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={s.colMainFoot}>
              <div className={s.colMainFootTxt}>
                &copy; Blogify. All right reserved. Manage by WebMob
                Technologies
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default signIn;
