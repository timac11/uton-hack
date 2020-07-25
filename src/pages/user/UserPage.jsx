import React from "react";
import "./UserPage.less";
import {Tabs} from "antd";
import {FormCreation} from "./tabs/FormCreation";
import {Redirect} from 'react-router-dom';
import MyForms from "./tabs/MyForms";
import {connect} from "react-redux";
import {fetchMyForms} from "../../store/actions/myForms";
import {fetchReviews} from "../../store/actions/reviews";
import Reviews from "./tabs/Reviews";
import {fetchShares} from "../../store/actions/shares";
import Shares from "./tabs/Shares";

const {TabPane} = Tabs;

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.tabChange = this.tabChange.bind(this);
  }

  tabChange(key) {
    if (key === "1") {
      this.props.dispatch(fetchMyForms());
    }
    if (key === "3") {
      this.props.dispatch(fetchReviews());
    }
    if (key === "4") {
      this.props.dispatch(fetchShares());
    }
  }

  render() {
    if (!this.props.isLogin) {
      return (
        <Redirect to={"/login"}/>
      )
    }

    return (
      <div className="gr-ux-user-page__wrapper">
        <div className="gr-ux-user-page__container">
          <Tabs onChange={this.tabChange} type="card" size="large" defaultActiveKey="2">
            <TabPane tab="My Forms" key="1">
              <MyForms/>
            </TabPane>
            <TabPane tab="Create new from" key="2">
              <FormCreation/>
            </TabPane>
            <TabPane tab="Reviews" key="3">
              <Reviews/>
            </TabPane>
            <TabPane tab="Shared me" key="4">
              <Shares/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isLogin} = state.user;
  return {isLogin};
}

export default connect(mapStateToProps)(UserPage);
