import { ColumnsType } from "antd/es/table";
import BillModal from "../model/Bill";
import { Button, Input, Space, Table, Upload } from "antd";
import {
  CheckCircleOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import QueryModel from "../model/Query";

const CheckBill: React.FC = () => {
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [bills, setBills] = useState<BillModal.Bill[]>([]);
  const [filters, setFilters] = useState<QueryModel.Query>({
    name: "",
  });

  useEffect(() => {
    const billsAll: BillModal.Bill[] = JSON.parse(
      localStorage.getItem("bill_check_history") as string
    );
    const bills: BillModal.Bill[] = [];
    if (filters.name !== "") {
      for (const bill of billsAll) {
        if (
          bill.customer_name.toLowerCase().includes(filters.name.toLowerCase())
        ) {
          bills.push(bill);
        }
      }
      setBills(bills);
    } else {
      setBills(billsAll);
    }
  }, [filters]);

  const handleFilter = () => {
    setFilters({ ...filters, name: txtSearch });
  };

  const columns: ColumnsType<BillModal.Bill> = [
    {
      title: "Bill ID",
      dataIndex: "bill_id",
      key: "bill_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Money",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value: unknown, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            // onClick={}
            size="middle"
          />
          <Button
            icon={<DeleteOutlined />}
            size="middle"
            // onClick={}
          />
        </Space>
      ),
      align: "center",
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "11% 2% 85% 2%" }}>
      <div id={"bill-ids"}>
        <TextArea
          style={{ marginTop: 54, height: 700 }}
          placeholder={"Enter bill ids"}
        />
      </div>
      <div />
      <div id={"table-bill"}>
        <Space>
          <Button type={"primary"} icon={<CheckCircleOutlined />}>
            Check
          </Button>
          <Upload name="logo" action="/upload.do" listType={"text"}>
            <Button type={"primary"} icon={<CloudUploadOutlined />}>
              Import
            </Button>
          </Upload>

          <Button type={"primary"} icon={<CloudDownloadOutlined />}>
            Export
          </Button>
          <Button
            type={"primary"}
            icon={<FileSearchOutlined />}
            onClick={handleFilter}
          >
            Filter
          </Button>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Filter by customer name"
            value={filters.name}
            onChange={(e) => setTxtSearch(e.target.value)}
            onPressEnter={handleFilter}
            allowClear
          />
          <Button type="dashed" block>
            Credits : 100
          </Button>
        </Space>
        <Table
          rowKey="bill_id"
          columns={columns}
          dataSource={bills}
          style={{ marginTop: 24 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default CheckBill;
