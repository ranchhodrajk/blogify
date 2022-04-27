import React, { useState, useEffect } from "react";
import s from "../../styles/SignUp.module.scss";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../apollo/mutation/Registration";
import { Row, Col } from "antd";
import { useRouter } from "next/router";
import {  useDispatch } from "react-redux"
import { showNav } from '../../Reducers/showNav'
import { setCookie } from "../../utilities/cookies";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  TwitterOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
const signUp = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [register, { data, loading, error }] = useMutation(REGISTER);

  const [resErr, setresErr] = useState("");
  const [resData, setresData] = useState();
  const [isloading, setisloading] = useState(loading);

  useEffect(() => {
    const isLog = localStorage.getItem("isLoggin");
    const isLoggin = JSON.parse(isLog);
    if (isLoggin === true) {
      router.push("/");
    }
  }, []);

  const onFinish = (values) => {
    register({ variables: { registerInput: values } })
      .then(
        (val) => (
          setisloading(true),
          setresData(val?.data?.register),
          // localStorage.setItem("token", val?.data?.register?.token),
          setCookie("token", val?.data?.register?.token, 1),
          router.push("/signIn")
        )
      )
      .catch(
        (error) => (
          setisloading(false),
          setresErr(error.message),
          console.log("Catch error", error.message)
        )
      );
  };

  const onClickLogo = () => {
    dispatch(showNav(true))
  }

  return (
    <div className={s.mainSignIn}>
      <div className={s.mainLayer}>
        <Row className={s.mainRow}>
          <Col lg={8} className={s.colMainRow}>
            {/* <div className={s.signInLab}>
              <div className={s.labTxt}>SIGN UP</div>
            </div> */}

            <div className={s.colMainForm}>
              <div className={s.colMainFormLogo} onClick={onClickLogo}>
                <Link href="/">
                  <a>
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
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        message: "Please enter strong password",
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
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your confirm password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="off"
                    />
                  </Form.Item>

                  {/* <Form.Item className="passKeep">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Form.Item> */}

                  <Form.Item className="passCustome" shouldUpdate>
                    {() => (
                      <Button
                        loading={isloading ? true : false}
                        // loading={loading && resErr==='' ? true : false}
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Sign In
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </div>
              {/* <div className={s.newReg}>
                <div className={s.newRegFP}>
                  <a href="">FORGOT PASSWORD?</a>
                </div>
                <div className={s.newReglbl}>
                  <a href="">NEW USER? REGISTER</a>
                </div>
              </div> */}
              <div
                style={{
                  color: "grey",
                  fontSize: "12px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                OR
              </div>
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
              <div className={s.allready}>
                Already have an account?
                <Link href="/signIn">
                  <a> Sign in </a>
                </Link>
              </div>
            </div>

            {/* <div className={s.colMainFoot}>
              <div className={s.colMainFootTxt}>
                &copy; Blogify. All right reserved. Manage by WebMob
                Technologies
              </div>
            </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default signUp;
