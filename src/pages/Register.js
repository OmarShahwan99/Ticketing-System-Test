import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

import { useRegister } from "../hooks/useHttp";

const Register = () => {
  const { mutate: registerMutation, data, isLoading, error } = useRegister();

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (data) {
      if (data.status === 201) {
        navigate("/");
        register(data.data);
        notification.open({
          type: "success",
          message: data.data.message,
          description: "your are registerd successfuly!",
          duration: 3,
        });
      } else {
        notification.open({
          type: "warning",
          message: "Something went wrong!",
          description: data.data.email,
          duration: 3,
        });
      }
    }
  }, [data, navigate, register]);

  if (error) {
    notification.open({
      type: "error",
      message: error.message,
      description: "Something went wrong!",
      duration: 3,
    });
  }

  const onSubmit = (values) => {
    registerMutation({ ...values, role_id: selectedRole });
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
        <h1 style={{ margin: "0" }}>Create your account</h1>
        <p style={{ marginTop: "10px" }}>
          Fill out these field below to register
        </p>
      </div>
      <Form name="normal_login" className="register-form" onFinish={onSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="name"
            type="text"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Select
            options={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
            ]}
            defaultValue="Choose role"
            onChange={(value) => setSelectedRole(value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Register
          </Button>
          Already have an account? <Link to="/login">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
