import React from "react";
import {Layout} from "antd";
import AppHeader from "./components/header/header";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import {RegistrationPage} from "./pages/registration/RegistrationPage";
import UserPage from "./pages/user/UserPage";
import {ApiProvider} from "./providers/api-provider";
import {userLogin, userLogout} from "./store/actions/user";
import {connect} from "react-redux";

class RoutingWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
  }

  async componentDidMount() {
    await ApiProvider.getRequest("profile")
      .then(() => {
        this.props.dispatch(userLogin());
      })
      .catch(({response}) => {
        this.props.dispatch(userLogout());
      });
  }

  render() {
    return (
      <Router>
        <Layout className="layout">
          <AppHeader/>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"/>
            </Route>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/registration">
              <RegistrationPage/>
            </Route>
            <Route path="/user">
              <UserPage/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default connect()(RoutingWrapper);
