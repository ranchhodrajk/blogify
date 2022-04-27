import React, { useState, useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import s from "../../styles/PopupSign.module.scss";
import { showSignInModel } from "../../Reducers/showSignInModel";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "antd";

const PopupSign = () => {
  const dispatch = useDispatch();
  const { isShowModel } = useSelector((state) => state.signInModel);


  const [isVis, setisVis] = useState();

  useEffect(() => {
    setisVis(isShowModel);
  }, []);

  const handleCancel = () => {
    dispatch(showSignInModel(!isShowModel));
  };

  return (
    // <div>
    <Modal visible={isVis} onCancel={handleCancel} footer={null}>
      <div className={s.mainPopContainer}>
        <div className={s.popHead}>You are not sign in !</div>
        <div className={s.image505}>
          <img src="/Assets/505.png" alt="" height="200" width="220" />
        </div>
        <div className={s.popHeadsub}>Want to getting in ?</div>
        <div className={s.menuItem}>
          <Link href="/signIn">
            <Button type="primary" danger shape="round">
              Go Sign In
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default PopupSign;
