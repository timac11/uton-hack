import React, {useState} from "react";
import {Button, notification, Divider, Form, Input, InputNumber, Typography, message, Spin} from "antd";
import {ApiProvider} from "../../../providers/api-provider";
import * as hash from 'hash-sdk'

const {Title} = Typography;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 8},
  size: "large"
};

export const FormCreation = () => {
  const [form] = Form.useForm();
  const [spinHidden, setSpinHidden] = useState(true);

  const onFinish = async values => {
    if (window.hash) {
      setSpinHidden(false);
      await hash.setProvider('composer');
      let data = {
        time: "1",
        memo: "Google form timestamping",
        contentid: 'test1',
        redirect: '{"nonPayingAccount": "/nomicropaymentreceived.html"}',
        recipientlist: '[{"tinybars": "50000000", "to":"0.0.43013"}]',
        type: 'article'
      };

      window.hash.triggerCryptoTransfer(data, async (err, res) => {
        form.resetFields();
        if (!err) {
          const topicId = await ApiProvider.addFormToBlockchain(values.link);
          values.topicId = topicId;
          await ApiProvider.postRequest("create-form", values);
          setSpinHidden(true);
          message.success('Form was successfully created');
        } else {
          message.error('Form was not created');
          setSpinHidden(true);
        }
      });
    } else {
      const args = {
        message: 'Notification',
        description: 'Please, setup Composer for Hedera Hashgraph extension and try again',
        duration: 5,
      };
      notification.error(args);
    }
  };

  return (
    <>
      <Title className="gr-ux-user-page__form-creation-title" level={2}>Form Creation</Title>
      <Divider/>
      <Spin spinning={!spinHidden} tip="Loading...">
        <Form name="registration"
              className="gr-ux-registration-page__form"
              initialValues={{remember: true}}
              onFinish={onFinish}
              form={form}
              {...layout}
        >
          <Form.Item label="Name"
                     name="name"
                     rules={[
                       {
                         required: true,
                         message: 'Please input form name!',
                       },
                     ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="Users Count"
                     name="usersCount"
                     rules={[
                       {
                         required: true,
                         message: 'Please input users count!',
                       },
                     ]}
          >
            <InputNumber style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item label="Link to google form"
                     name="link"
                     rules={[
                       {
                         required: true,
                         message: 'Please input link!',
                       },
                     ]}
          >
            <Input/>
          </Form.Item>
          <Divider/>
          <Form.Item style={{display: "flex", width: "100%", justifyContent: "center"}}>
            <Button size="large"
                    type="primary"
                    htmlType="submit">
              Pay for creation and submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
};
