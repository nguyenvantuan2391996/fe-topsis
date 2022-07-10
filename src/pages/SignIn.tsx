import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignIn: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={6}>
        <Card title="Sign-in bill electric">
          <Form
            name="sign-in-form"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
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
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
              <a style={{ marginLeft: 10 }} href={"/sign-up"}>
                Sign up here
              </a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
