import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useLogin } from "../hooks/useHttp";

const Login = () => {
  const navigate = useNavigate();

  const { mutate: loginMutation, data, isLoading, error } = useLogin();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      login(data.data);
      navigate("/");
      notification.open({
        type: "success",
        message: data.data.message,
        description: "your are logged in successfuly!",
        duration: 3,
      });
    }
  }, [data, login, navigate]);

  if (error) {
    notification.open({
      type: "error",
      message: error.message,
      description: "Something went wrong!",
      duration: 3,
    });
  }

  const onSubmit = (values) => {
    loginMutation(values);
  };

  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        marginTop: "120px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: "0" }}>Welcome Back!</h1>
        <p style={{ marginTop: "10px" }}>
          Login for going to your tacketing system
        </p>
      </div>
      <Form name="normal_login" className="login-form" onFinish={onSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Eamil!" }]}
        >
          <Input
            type="email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
