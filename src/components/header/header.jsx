import React from "react";
import {Button, Layout} from "antd";
import {useHistory} from "react-router-dom";
import LogoStartBlock from "../../resources/LogoStartBlock.png";
import "./header.less";
import {logout} from "../auth/localStorage";
import {connect} from "react-redux";
import {userLogout} from "../../store/actions/user";

const {Header} = Layout;
const size = "large";

const AppHeader = (props) => {
    const history = useHistory();
    const authLogout = () => {
      logout();
      props.dispatch(userLogout());
    };

    return (
        <Header className="gr-ux-header">
            <div>
                <img className="gr-ux-header__logo"
                     alt=""
                     src={LogoStartBlock}/>
            </div>
            <div className="gr-ux-header__buttons-wrapper">
              {
                props.isLogin ?
                  <Button className="gr-ux-header__sign-in-button"
                          type="primary"
                          size={size}
                          onClick={() => {authLogout(); history.push("/login");}}>
                    Sign Out
                  </Button> :
                  <>
                    <Button className="gr-ux-header__sign-in-button"
                            type="primary"
                            size={size}
                            onClick={() => history.push("/login")}>
                      Sign In
                    </Button>
                    <br/>
                    <Button type="primary"
                            size={size}
                            onClick={() => history.push("/registration")}>
                      Sign Up
                    </Button>
                  </>
              }
            </div>
        </Header>
    )
};

function mapStateToProps(state) {
  const { isLogin } = state.user;

  return { isLogin };
}

export default connect(mapStateToProps)(AppHeader);
