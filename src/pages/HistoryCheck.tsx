import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import BillModal from "../model/Bill";
import {
  CloudDownloadOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import QueryModel from "../model/Query";

const HistoryCheck: React.FC = () => {
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
  ];
  return (
    <div style={{ marginLeft: 24, marginRight: 24 }}>
      <Space>
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
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          total: !bills ? 0 : bills.length,
        }}
      />
    </div>
  );
};

export default HistoryCheck;
