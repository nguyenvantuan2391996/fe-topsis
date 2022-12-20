import { Alert, Button, Card, Col, Form, Image, Input, Row } from "antd";
import React from "react";
import { useUserList } from "../hooks/UserHook";
import UserModel from "../model/User";

const SignUpPage: React.FC = () => {
  const { errorValidate, loading, handleSignUpUser } = useUserList();
  const [form] = Form.useForm();

  const onFinish = (inputForm: UserModel.User) => {
    const userInput: UserModel.User = {
      name: inputForm.name,
    };
    handleSignUpUser(userInput);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Col span={6}>
        <Card bordered={true} loading={loading}>
          <div style={{ marginBottom: 24 }}>
            <Image src="https://viewer.diagrams.net/img/lib/atlassian/Atlassian_Logo.svg" />
          </div>
          <Form
            name="sign-in-form"
            autoComplete="off"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên của bạn!" },
              ]}
            >
              <Input placeholder="Nhập tên của bạn" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div>
            {!!errorValidate && !!errorValidate.get("Name") && (
              <Alert
                message={errorValidate.get("Name")}
                type="error"
                showIcon={true}
                closable={true}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpPage;
