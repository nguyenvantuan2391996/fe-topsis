import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import UserModel from "../model/User";
import { sha256 } from "js-sha256";
import { useUserList } from "../hooks/UserHook";

const SignUp: React.FC = () => {
  const { loading, handleSignUpUser } = useUserList();
  const [isError, setIsError] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = (inputForm: UserModel.User) => {
    inputForm.password !== inputForm.confirm_password
      ? setIsError(true)
      : setIsError(false);

    const userInput: UserModel.User = {
      user_name: inputForm.user_name,
      password: sha256(inputForm.password),
      phone: inputForm.phone,
      email: inputForm.email,
      created_at: Date.now(),
      access_token: sha256(Date.now().toString()),
    };
    handleSignUpUser(userInput);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", width: "auto" }}
    >
      <Col span={8}>
        <Card title="Sign-up bill electric" loading={loading}>
          <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="user_name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  max: 20,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  max: 20,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "The input is not valid phone!",
                },
              ]}
            >
              <Input addonBefore={"+84"} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" onClick={() => form.submit()}>
                Sign up
              </Button>
              <a style={{ marginLeft: 10 }} href={"/"}>
                Sign in here
              </a>
            </Form.Item>
          </Form>
          {isError && <Alert message="Password mismatch" type="error" />}
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
