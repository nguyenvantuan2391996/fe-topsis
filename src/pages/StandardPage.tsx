import React, { useEffect, useRef } from "react";
import { Alert, Button, Col, Form, Input, Row, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  FileAddOutlined,
  ExclamationCircleOutlined,
  FastForwardOutlined,
} from "@ant-design/icons";
import { useStandardList } from "../hooks/StandardHook";
import StandardModel from "../model/Standard";
import { DELETE_MODAL_TITLE, TITLE_DELETE } from "../commons/Config";
import { showConfirmModal } from "../helper/Notification";
import { useNavigate } from "react-router-dom";

const style: React.CSSProperties = { padding: "8px 0" };

const StandardPage: React.FC = () => {
  const navigate = useNavigate();
  const rendered = useRef(false);
  const [form] = Form.useForm();
  const {
    errorValidate,
    loading,
    standards,
    handleGetStandards,
    handleCreateStandard,
    handleDeleteStandard,
  } = useStandardList();

  useEffect(() => {
    if (!rendered.current) {
      handleGetStandards(
        JSON.parse(localStorage.getItem("user_info") as string).id
      );
      rendered.current = true;
    }
  }, [rendered.current]);

  const onFinish = async (inputForm: {
    standard_name: string;
    weight: number;
  }) => {
    const bodyRequest: StandardModel.StandardBodyRequest = {
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      standard_name: inputForm.standard_name,
      weight: Number(inputForm.weight),
    };
    await handleCreateStandard(bodyRequest);
    rendered.current = false;
  };

  const deleteStandard = (standardId: string, standardName: string) => {
    showConfirmModal({
      title: TITLE_DELETE(standardName),
      width: 516,
      content: (
        <div>
          <div>{DELETE_MODAL_TITLE("this standard")}</div>
        </div>
      ),
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await handleDeleteStandard(standardId);
        rendered.current = false;
      },
    });
  };

  const columns: ColumnsType<StandardModel.Standard> = [
    {
      title: "S??? th??? t???",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Ti??u ch??",
      dataIndex: "standard_name",
      key: "standard_name",
    },
    {
      title: "M???c ????? quan tr???ng",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "action",
      key: "action",
      render: (value: unknown, record) => (
        <Button
          type="primary"
          danger
          onClick={() =>
            deleteStandard(record.id as string, record.standard_name)
          }
        >
          Xo??
        </Button>
      ),
    },
  ];
  return (
    <Spin spinning={loading}>
      <Form
        name="sign-in-form"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div style={style}>
              <Form.Item name="standard_name">
                <Input placeholder="Nh???p ti??u ch??" allowClear />
              </Form.Item>
              {!!errorValidate && !!errorValidate.get("StandardName") && (
                <Alert
                  message={errorValidate.get("StandardName")}
                  type="error"
                  showIcon={true}
                  closable={true}
                />
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>
              <Form.Item
                name="weight"
                rules={[
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Vui l??ng nh???p m???c ????? quan tr???ng l?? s???!",
                  },
                ]}
              >
                <Input placeholder="Nh???p m???c ????? quan tr???ng" allowClear />
              </Form.Item>
              {!!errorValidate && !!errorValidate.get("Weight") && (
                <Alert
                  message={errorValidate.get("Weight")}
                  type="error"
                  showIcon={true}
                  closable={true}
                />
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={1}>
            <div style={style}>
              <Button
                type={"primary"}
                icon={<FileAddOutlined />}
                onClick={() => form.submit()}
              >
                Th??m
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button
                type={"primary"}
                icon={<FastForwardOutlined />}
                onClick={() => navigate("/score-rating")}
              >
                Chuy???n
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={standards}
        style={{ marginTop: 24 }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          total: standards.length,
        }}
      />
    </Spin>
  );
};

export default StandardPage;
