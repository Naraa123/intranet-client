import React from "react";
import { Provider } from "react-redux";
import { Result, Button } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import history from "./history";
import MainLayout from "./layout";
import Login from "./views/Login";
import store from "./redux/store";
import "./services/interceptor";

import { user } from "./configs/url.configs";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={user.signin} exact render={() => <Login />} />
          <Route path={"/"} render={() => <MainLayout />} />
          <Route
            component={() => (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
              />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
