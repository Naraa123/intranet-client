import React from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  BankOutlined,
  ContainerOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { dep, emp, org, pos } from "configs/url.configs";

const { Sider } = Layout;

const SiderBar = () => {
  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item
          key="1"
          icon={<BankOutlined />}
          onClick={() => {
            window.location = org.orgs;
          }}
        >
          Байгууллага
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<FileTextOutlined />}
          onClick={() => {
            window.location = dep.deps;
          }}
        >
          Алба Хэлтэс
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<TeamOutlined />}
          onClick={() => {
            window.location = emp.emps;
          }}
        >
          Ажилтан
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<ContainerOutlined />}
          onClick={() => {
            window.location = pos.position;
          }}
        >
          Албан тушаал
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderBar;
