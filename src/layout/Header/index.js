import React from "react";

import { Layout } from "antd";
const { Header } = Layout;

const Hdr = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        textAlign: "center",
        color: "#fff",
      }}
    >
      Байгууллага бүртгэл
    </Header>
  );
};

export default Hdr;
