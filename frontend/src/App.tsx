import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { css } from "@emotion/core";
import { Home } from "./pages/Home";
import { TaskNew } from "./pages/tasks/TaskNew";

export const App: React.FC = () => {
  return (
    <Router>
      <div>
        <AppBar position={"sticky"}>
          <Toolbar>
            <Typography>
              <Link to="/" style={{ color: "#fff" }}>
                Home
              </Link>
            </Typography>
            <Typography>
              <Link to="/tasks/new" style={{ color: "#fff" }}>
                新規作成
              </Link>
            </Typography>
            <Typography>
              <Link to="/users" style={{ color: "#fff" }}>
                Users
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/tasks/new">
            <TaskNew />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Users() {
  return <h2>Users</h2>;
}

const linkStyle = css`
  color: #fff;
`;
