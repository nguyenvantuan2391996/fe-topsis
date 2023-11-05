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

  const UsingExampleUser = () => {
    localStorage.setItem("standards_info", "[]")
    localStorage.setItem("user_info", `{"id":"1227e1cb-9840-4a19-b046-7649db432cfd","name":"Nguyen Van Tuan"}`)
    window.location.reload()
  }

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
          <Button
              style={{ marginLeft: 24 }}
              type="primary"
              htmlType="submit"
              onClick={() => UsingExampleUser()}
          >
            Using Example User
          </Button>
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
