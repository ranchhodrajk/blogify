import { Result, Modal, Button, Divider,notification } from "antd";
import React, { useState, useEffect } from "react";
import s from "../../styles/PopupDelete.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { showDeleteModel } from "../../Reducers/showSignInModel";
import { DELETE_BLOG } from "../../apollo/mutation/DeleteBlog";
import { useMutation } from "@apollo/client";
import { SmileOutlined } from "@ant-design/icons";


const PopupDelete = ({ reftch }) => {
  const dispatch = useDispatch();
  const { isDeleteModel,deletePostId } = useSelector((state) => state.signInModel);

  const [
    deletePost,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_BLOG);



  const [isVis, setisVis] = useState();

  useEffect(() => {
    setisVis(isDeleteModel);
  }, []);


  const openNotification = () => {
    notification.open({
      duration: 3,
      message: 'Blog deleted',
      description:
        'Your blog is delete successfully.',
      icon: <SmileOutlined style={{ color: 'green' }} />,
    });
  };


  const handleCancel = () => {
    dispatch(showDeleteModel(!isDeleteModel));
  };

  const onClickDelete = () => {
    deletePost({
        variables: { postId: deletePostId },
      })
        .then((value) => (handleCancel(),openNotification(),reftch()))
        .catch((error) => console.log("Blog delete err", error));
  }

  return (
    <Modal visible={isVis} onCancel={handleCancel} footer={null}>
      <Result
        
        title="Want to delete post ?"
        extra={
          <div>
            <Button type="primary" key="console" onClick={handleCancel} style={{marginRight:'16px'}}>
              Cancle
            </Button>
            <Button type="primary" key="console" danger onClick={onClickDelete}>
              Delete
            </Button>
          </div>
        }
      />
    </Modal>
  );
};

export default PopupDelete;
