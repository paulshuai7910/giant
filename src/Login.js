import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

const Login = ({ setPageType }) => {
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);
    const mockLogin = () => Promise.resolve({ token: "fake-token" });

    try {
      const { token } = await mockLogin();
      if (!rememberMe) {
        localStorage.setItem("auth_token", token);
      }
      console.log("login success");
    } catch (error) {
      console.error("login fail", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="User Email"
        name="username"
        rules={[
          { required: true, message: "Please input your User Email!" },
          {
            pattern: emailRegex,
            message: "The email format is incorrect!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be at least 8 characters!" },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 12 }}
      >
        <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
          Remember me
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button
          onClick={() => {
            setPageType("register");
          }}
          style={{ marginLeft: 8 }}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
