import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  console.log(confirmDirty);
  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(value ? true : false);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const form = form.getFieldsValue();
    if (value && value !== form.password) {
      callback("Entered passwords differ!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("please enter password!"));
    }
    return Promise.resolve();
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    message.success("success register!");
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="User Email"
        name="username"
        rules={[{ required: true, message: "Please enter Email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { validator: validateToNextPassword },
          { required: true, message: "please enter Password!" },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="password again"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "please enter password again!" },
          { validator: compareToFirstPassword },
        ]}
      >
        <Input.Password onBlur={handleConfirmBlur} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            !form.getFieldsValue().confirm ||
            !form.getFieldsValue().password ||
            form.getFieldsValue().password !== form.getFieldsValue().confirm
          }
        >
          register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
