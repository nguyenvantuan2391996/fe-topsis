import { Tabs } from "antd";
import {
  ContactsOutlined,
  HistoryOutlined,
  MailOutlined,
} from "@ant-design/icons";
import CheckBill from "./CheckBill";
import HistoryCheck from "./HistoryCheck";
import Contact from "./Contact";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <MailOutlined />
              Check Bill
            </span>
          }
          key="1"
        >
          <CheckBill />
        </TabPane>
        <TabPane
          tab={
            <span>
              <HistoryOutlined />
              History Check
            </span>
          }
          key="2"
        >
          <HistoryCheck />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ContactsOutlined />
              Contact
            </span>
          }
          key="3"
        >
          <Contact />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Dashboard;
