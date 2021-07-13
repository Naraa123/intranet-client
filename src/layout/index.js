import React, { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

import Foot from "./Footer";
import OrgList from "views/Org";
import DepList from "views/Dep";
import PosList from "views/Pos";
import EmpList from "views/Emp";
import { dep, pos, emp, org } from "../configs/url.configs";

import SiderBar from "./Sider";
import Hdr from "./Header";
const { Content } = Layout;
const MainLayout = () => {
  const history = useHistory();

  // useEffect(() => {
  //   if (!state.login) {
  //     history.push("/auth/login");
  //   }
  // }, [state]);

  useLayoutEffect(() => {
    // if (!localStorage.getItem(auth.token)) {
    //   history.push(auth.signin);
    // }
    //eslint-disable-next-line
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBar />
      <Layout className="site-layout">
        <Hdr />
        <Content style={{ margin: "0 16" }}>
          <Router history={history}>
            <Switch>
              <Route path={org.orgs} render={() => <OrgList />} />
              <Route path={dep.deps} render={() => <DepList />} />
              <Route path={pos.position} render={() => <PosList />} />
              <Route path={emp.emps} render={() => <EmpList />} />
            </Switch>
          </Router>
        </Content>
        <Foot />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
// <div>
//   <Navbar />
//   <OrgList />
// </div>
