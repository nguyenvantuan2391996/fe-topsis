import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  FastForwardOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useScoreRatingList } from "../hooks/ScoreRatingHook";
import StandardModel from "../model/Standard";

const style: React.CSSProperties = { padding: "8px 0" };

const ScoreRatingPage: React.FC = () => {
  const [columns, setColumns] = useState<any[]>([
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
  ]);

  const navigate = useNavigate();
  const rendered = useRef(false);
  const { loading, scoreRatings, handleScoreRating } = useScoreRatingList();

  useEffect(() => {
    if (!rendered.current) {
      handleScoreRating(
        JSON.parse(localStorage.getItem("user_info") as string).id
      );
      const standards: StandardModel.Standard[] = JSON.parse(
        localStorage.getItem("standards_info") as string
      );
      if (!!standards) {
        for (const standard of standards) {
          columns.push({
            title: standard.standard_name,
            dataIndex: standard.standard_name,
            key: standard.standard_name,
          });
        }
      }
      setColumns(columns);
      rendered.current = true;
    }
  }, [rendered.current]);

  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col className="gutter-row" span={2}>
          <div style={style}>
            <Button type={"primary"} icon={<FileAddOutlined />}>
              Thêm dòng
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div style={style}>
            <Button type={"primary"} icon={<SaveOutlined />}>
              Lưu data
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={1}>
          <div style={style}>
            <Button
              type={"primary"}
              icon={<FastForwardOutlined />}
              onClick={() => navigate("/consult")}
            >
              Chuyển
            </Button>
          </div>
        </Col>
      </Row>

      <Table
        rowKey="stt"
        columns={columns}
        dataSource={scoreRatings}
        style={{ marginTop: 24 }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          total: !scoreRatings ? 0 : scoreRatings.length,
        }}
      />
    </Spin>
  );
};

export default ScoreRatingPage;
