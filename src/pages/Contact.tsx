import { Button, Card, Col, Collapse, Image, Row } from "antd";
import React, { useState } from "react";
import { CONTACT } from "../commons/Config";
import { CopyrightOutlined, TrademarkCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Contact: React.FC = () => {
  const [visibleMomo, setVisibleMomo] = useState(false);
  const [visibleVietinBank, setVisibleVietinBank] = useState(false);
  return (
    <>
      <div style={{ marginTop: 24 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card type="inner" title={<strong>Pricing</strong>} bordered={true}>
              <Button type={"primary"}>30.000 VND / 100 credit</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner" title={<strong>Momo</strong>} bordered={true}>
              <Image
                style={{ display: "none" }}
                src={"/images/3331594767.jpg"}
                preview={{
                  visible: visibleMomo,
                  src: "/images/3331594767.jpg",
                  onVisibleChange: (value) => {
                    setVisibleMomo(value);
                  },
                }}
              />
              <Button type="primary" onClick={() => setVisibleMomo(true)}>
                QR code Momo
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner" title={<strong>Banking</strong>} bordered={true}>
              <Image
                style={{ display: "none" }}
                src={"/images/98794916514.jpg"}
                preview={{
                  visible: visibleVietinBank,
                  src: "/images/98794916514.jpg",
                  onVisibleChange: (value) => {
                    setVisibleVietinBank(value);
                  },
                }}
              />
              <Button type="primary" onClick={() => setVisibleVietinBank(true)}>
                QR code VietinBank
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <strong style={{ fontSize: 16 }}>Frequently Asked Questions</strong>
        </div>
        <Collapse accordion bordered={true}>
          {CONTACT.PRICING_SUBSCRIPTION.map((element, index) => (
            <Panel header={element.header} key={index}>
              {element.content.map((data, i) => (
                <div key={i}>{data.title}</div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
      <div style={{ marginTop: 24 }}>
        Copyright <CopyrightOutlined /> 2022 by Nguyen Van Tuan - Phone {""}
        <a href="tel:0965651574">0965651574</a> <TrademarkCircleOutlined />
      </div>
    </>
  );
};

export default Contact;
