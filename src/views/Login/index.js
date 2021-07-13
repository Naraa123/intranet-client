import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
//import { authenticate } from "redux/actions/auth";
import { user } from "configs/url.configs";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
//import logo from "../../images/logo.png";
import zeely from "../../images/zeely.png";
import "./index.css";
import { sendReqPost } from "services/api";

const Login = () => {
  const dispatch = useDispatch();
  //const state = useSelector((state) => state.auth);
  const history = useHistory();

  const [form] = Form.useForm();

  //   useEffect(() => {
  //     //var uName = localStorage.getItem(auth.username);
  //     if (state.login) {
  //       history.push("/");
  //     } else if (uName !== null) {
  //       form.resetFields();
  //       form.setFieldsValue({ phoneNo: uName });
  //     }
  //     //eslint-disable-next-line
  //   }, [state]);

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        await sendReqPost(user.signin, values);
        message.success({
          content: "Амжилттай нэвтэрлээ",
          style: {
            marginTop: "8vh",
            marginLeft: "80%",
          },
        });
      })
      .catch((error) =>
        message.error({
          content: " Нэвтрэх нэр эсвэл нууц үг буруу байна!",
        })
      );
  };

  return (
    <div className="div-login">
      <div className="div-login-logo">
        <img
          src={zeely}
          alt=""
          style={{ width: "200px", height: "150px", margin: "-50px auto" }}
        />
      </div>
      <div>
        <Form name="basic" className="login-form" form={form}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Нэвтрэх нэрээ оруулна уу!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Нэвтрэх нэр"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Нууц үгээ оруулна уу!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Нууц үг"
            />
          </Form.Item>
          {/* <Form.Item>
            <a className="login-form-forgot" href="/#">
              Нууц үг сэргээх
            </a>
          </Form.Item> */}
          <Form.Item>
            <Button
              // loading={state.loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => onFinish()}
            >
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
