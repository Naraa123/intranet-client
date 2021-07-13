import { Layout } from "antd";
const { Footer } = Layout;

const Foot = () => {
  return (
    <Footer
      className="ant-layout-footer"
      style={{
        position: "relative",
        bottom: 0,
        width: "100%",
        height: "60px",
        paddingTop: "20px",
        textAlign: "center",
      }}
    >
      &copy; TanaSoft {new Date().getFullYear()}
    </Footer>
  );
};

export default Foot;
