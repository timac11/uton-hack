import React from "react";
import {Button, Form, Input} from "antd";
import {Typography, Divider} from 'antd';
import "./LoginPage.less";
import {ApiProvider} from "../../providers/api-provider";
import {getUser, login} from "../../components/auth/localStorage";
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {userLogin} from "../../store/actions/user";

const {Title} = Typography;


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
  size: "large"
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

const LoginPage = (props) => {
  const history = useHistory();

  const onFinish = async values => {
    console.log(values);
    const result = await ApiProvider.postRequest("auth/login", values);
    if (result.status === 201) {
      login(result.data);
      props.dispatch(userLogin());
      history.push("/user");
    } else {
      // TODO add notification
    }
  };


    if (props.isLogin) {
      return (
        <Redirect to={"/user"}/>
      )
    }

    return (
      <div className="gr-ux-login-page__form-wrapper">
        <div className="gr-ux-login-page__form-container">
          <Title style={{marginBottom: 0}} level={2}>Sign In</Title>
          <Divider/>
          <Form name="login"
                className="gr-ux-login-page__form"
                initialValues={{remember: true}}
                {...layout}
                onFinish={onFinish}
          >
            <Form.Item label="E-mail"
                       name="email"
                       rules={[
                         {
                           type: 'email',
                           message: 'The input is not valid E-mail!',
                         },
                         {
                           required: true,
                           message: 'Please input your E-mail!',
                         },
                       ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item label="Password"
                       name="password"
                       rules={[
                         {
                           required: true,
                           message: 'Please input your Password!',
                         },
                       ]}
                       hasFeedback
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout}
            >
              <Button type="primary"
                      htmlType="submit"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
};

function mapStateToProps(state) {
  const { isLogin } = state.user;

  return { isLogin };
}

export default connect(mapStateToProps)(LoginPage);
