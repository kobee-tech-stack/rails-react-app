import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Home } from "./pages/Home";
import { TaskNew } from "./pages/tasks/TaskNew";
import { TaskEdit } from "./pages/tasks/TaskEdit";
import { TaskShow } from "./pages/tasks/TaskShow";
import { HomeProvider } from "./context/home";
import { EditTaskProvider } from "./context/edit";
import { TaskShowProvider } from "./context/show";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";

export const App: React.FC = () => {
  return (
    <Router>
      <div>
        <AppBar position={"sticky"}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              <Link to="/" style={{ color: "#fff" }}>
                <HomeIcon />
              </Link>
            </Typography>
            <Typography>
              <Link to="/task/new" style={{ color: "#fff" }}>
                <AddIcon />
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path={"/task/new"}>
            <TaskNew />
          </Route>
          <Route path={"/task/:id/edit"}>
            <EditTaskProvider>
              <TaskEdit />
            </EditTaskProvider>
          </Route>
          <Route path={"/task/:id"}>
            <TaskShowProvider>
              <TaskShow />
            </TaskShowProvider>
          </Route>
          <Route path={"/"}>
            <HomeProvider>
              <Home />
            </HomeProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
