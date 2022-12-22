import React, { useEffect, useRef } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Table,
  Select,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  FileAddOutlined,
  ExclamationCircleOutlined,
  FastForwardOutlined,
  LogoutOutlined,
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
    type_standard: string;
  }) => {
    const bodyRequest: StandardModel.StandardBodyRequest = {
      user_id: JSON.parse(localStorage.getItem("user_info") as string).id,
      standard_name: inputForm.standard_name,
      weight: Number(inputForm.weight),
      type: inputForm.type_standard,
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

  const logOut = () => {
    localStorage.removeItem("user_info");
    localStorage.removeItem("standards_info");
    navigate("/")
  }

  const columns: ColumnsType<StandardModel.Standard> = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tiêu chí",
      dataIndex: "standard_name",
      key: "standard_name",
    },
    {
      title: "Mức độ quan trọng",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Kiểu tiêu chuẩn",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Hành động",
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
          Xoá
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
        <Row gutter={15}>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              <Form.Item name="standard_name">
                <Input placeholder="Nhập tiêu chí" allowClear />
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
          <Col className="gutter-row" span={6}>
            <div style={style}>
              <Form.Item
                name="weight"
                rules={[
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Vui lòng nhập mức độ quan trọng là số!",
                  },
                ]}
              >
                <Input placeholder="Nhập mức độ quan trọng" allowClear />
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
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Form.Item name="type_standard">
                <Select
                  placeholder="Chọn kiểu tiêu chuẩn"
                  options={[
                    {
                      value: "max-max",
                      label: "as big as possible",
                    },
                    {
                      value: "min-max",
                      label: "as small as possible",
                    },
                  ]}
                />
              </Form.Item>
              {!!errorValidate && !!errorValidate.get("Type") && (
                <Alert
                  message={errorValidate.get("Type")}
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
                Thêm
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div style={style}>
              <Button
                type={"primary"}
                icon={<FastForwardOutlined />}
                onClick={() => navigate("/score-rating")}
              >
                Chuyển
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={1}>
            <div style={style}>
              <Button
                  type={"primary"}
                  icon={<LogoutOutlined />}
                  onClick={logOut}
              >
                Đăng xuất
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
