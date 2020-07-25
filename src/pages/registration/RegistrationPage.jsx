import React from "react";
import {Button, Form, Input, message} from "antd";
import {Typography, Divider} from 'antd';
import "./RegistrationPage.less";
import {ApiProvider} from "../../providers/api-provider";
import {useHistory} from "react-router-dom";

const {Title} = Typography;


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
  size: "large"
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export const RegistrationPage = () => {
  const history = useHistory();

  const onFinish = async values => {
    console.log(values);
    await ApiProvider.postRequest("register", values);
    message.info('Successful registration!');
    history.push("/login");
  };

  return (
    <div className="gr-ux-registration-page__form-wrapper">
      <div className="gr-ux-registration-page__form-container">
        <Title style={{marginBottom: 0}} level={2}>Sign Up</Title>
        <Divider/>
        <Form name="registration"
              className="gr-ux-registration-page__form"
              initialValues={{remember: true}}
              {...layout}
              onFinish={onFinish}
        >
          {/*<Form.Item label="Wallet"*/}
          {/*           name="wallet"*/}
          {/*           rules={[*/}
          {/*             {*/}
          {/*               required: true,*/}
          {/*               message: 'Please input your Wallet!',*/}
          {/*             },*/}
          {/*           ]}*/}
          {/*>*/}
          {/*  <Input/>*/}
          {/*</Form.Item>*/}

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
          <Form.Item label="Confirm Password"
                     name="confirmPassword"
                     dependencies={['password']}
                     hasFeedback
                     rules={[
                       {
                         required: true,
                         message: 'Please confirm your Password!',
                       },
                       ({getFieldValue}) => ({
                         validator(rule, value) {
                           if (!value || getFieldValue('password') === value) {
                             return Promise.resolve();
                           }
                           return Promise.reject('The two passwords that you entered do not match!');
                         },
                       }),
                     ]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item {...tailLayout}
          >
            <Button type="primary"
                    htmlType="submit"
            >
              Submit Registration
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
