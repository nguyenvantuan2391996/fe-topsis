import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormInstance, Input, Row, Spin, Table } from "antd";
import type { InputRef } from "antd";
import {
  FastForwardOutlined,
  FileAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useScoreRatingList } from "../hooks/ScoreRatingHook";
import StandardModel from "../model/Standard";

const style: React.CSSProperties = { padding: "8px 0" };

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

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
      editable: true,
    },
  ]);

  const navigate = useNavigate();
  const rendered = useRef(false);
  const { loading, scoreRatings, handleScoreRating, addStateScoreRating } =
    useScoreRatingList();

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
            editable: true,
          });
        }
      }

      const customColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record: any) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });
      setColumns(customColumns);
      rendered.current = true;
    }
  }, [rendered.current]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleAdd = () => {
    const newData = {
      ...scoreRatings[0],
      stt: scoreRatings.length + 1,
      id: "hihi",
    };
    addStateScoreRating(newData);
  };

  const handleSave = (newData: any) => {
    console.log(newData);
  };

  const handleSaveData = () => {
    console.log("handleSaveData", scoreRatings);
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col className="gutter-row" span={2}>
          <div style={style}>
            <Button
              type={"primary"}
              icon={<FileAddOutlined />}
              onClick={handleAdd}
            >
              Thêm dòng
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div style={style}>
            <Button
              type={"primary"}
              icon={<SaveOutlined />}
              onClick={handleSaveData}
            >
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
        components={components}
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
