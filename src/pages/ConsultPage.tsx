import React, { useEffect, useRef } from "react";
import { Button, Col, Row, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FileAddOutlined } from "@ant-design/icons";
import { useConsultList } from "../hooks/ConsultHook";

const style: React.CSSProperties = { padding: "8px 0" };

const ConsultPage: React.FC = () => {
  const rendered = useRef(false);
  const { loading, resultConsult, handleGetResultConsult } = useConsultList();

  useEffect(() => {
    if (!rendered.current) {
      handleGetResultConsult(
        JSON.parse(localStorage.getItem("user_info") as string).id
      );
      rendered.current = true;
    }
  }, [rendered.current]);

  const handleConsult = () => {
    rendered.current = false;
  };

  const columns: ColumnsType<any> = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Độ đo tương tự",
      dataIndex: "similarity",
      key: "similarity",
    },
  ];
  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col className="gutter-row" span={1}>
          <div style={style}>
            <Button
              type={"primary"}
              icon={<FileAddOutlined />}
              onClick={handleConsult}
            >
              Tư vấn
            </Button>
          </div>
        </Col>
      </Row>

      <Table
        rowKey="stt"
        columns={columns}
        dataSource={resultConsult}
        style={{ marginTop: 24 }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          total: !resultConsult ? 0 : resultConsult.length,
        }}
      />
    </Spin>
  );
};

export default ConsultPage;
