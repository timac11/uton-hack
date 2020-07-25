import React, {useDebugValue} from "react";
import {Button, List, message, Modal, Select, Tag, Typography} from "antd";
import "./MyForms.less";
import {connect} from "react-redux";
import {fetchUsers} from "../../../store/actions/user";
import {ApiProvider} from "../../../providers/api-provider";
import {fetchMyForms} from "../../../store/actions/myForms";

const {Title} = Typography;
const {Option} = Select;

class MyForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalShareVisible: false,
      chosenUser: null
    };
    this.handleReview = this.handleReview.bind(this);
    this.handleCloseReview = this.handleCloseReview.bind(this);
    this.shareToUsers = this.shareToUsers.bind(this);
    this.handleShareClose = this.handleShareClose.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }


  async handleReview() {
    await ApiProvider.postRequest("add-reviewer-by-id", {
      userId: this.state.chosenUser,
      formId: this.state.chosenFormId
    });
    this.setState({
      chosenUser: null,
      chosenFormId: undefined,
      modalVisible: false
    });
    this.props.dispatch(fetchMyForms());
    message.success("Successfully send to review!");
  }

  async shareToUsers() {
    await ApiProvider.postRequest("share-form", {
      userIds: this.state.chosenUser,
      formId: this.state.chosenFormId
    });
    this.setState({
      chosenUser: null,
      chosenFormId: undefined,
      modalShareVisible: false
    });
    message.success("Successfully shared to users!");
  }

  handleShareClose() {
    this.setState({
      modalShareVisible: false,
      chosenUser: null,
      chosenFormId: undefined
    })
  }

  handleCloseReview() {
    this.setState({
      modalVisible: false,
      chosenUser: null,
      chosenFormId: undefined
    })
  }

  render() {
    const forms = this.props.myForms;
    const users = this.props.users;

    return (
      <>
        <Modal title="Send to review"
               visible={this.state.modalVisible}
               onOk={this.handleReview}
               onCancel={this.handleCloseReview}
        >
          <p>Choose user for review</p>
          <Select style={{width: 200}}
                  onChange={(val) => this.setState({chosenUser: val})}>
            {users.map(user => <Option value={user.id}>{user.email}</Option>)}
          </Select>
        </Modal>
        <Modal title="Share"
               visible={this.state.modalShareVisible}
               onOk={this.shareToUsers}
               onCancel={this.handleShareClose}
        >
          <p>Choose users to share</p>
          <Select style={{width: 200}}
                  mode="multiple"
                  onChange={(val) => this.setState({chosenUser: val})}>
            {users.map(user => <Option value={user.id}>{user.email}</Option>)}
          </Select>
        </Modal>
        <Title className="gr-ux-user-page__form-creation-title" level={2}>My Forms</Title>
        <div style={{overflow: "scroll"}}>
          <List
            dataSource={forms}
            renderItem={form => (
              <List.Item className="ux-my-forms__list-item-wrapper">
                <div className="ux-my-forms__list-item">
                  <Typography.Title level={4}>{form.name}</Typography.Title>
                  <div className="ux-my-forms__list-item-info">
                    <Typography.Text>Author: {form.owner.email}</Typography.Text>
                    <Typography.Text>Reviewer: {form.reviewer ? form.reviewer.email : "-"}</Typography.Text>
                    <Typography.Text>Creation
                      Date: {new Date(form.creationDate).toLocaleString().replace(",", "")}</Typography.Text>
                    <Typography.Text><a href={form.link}>Link to form</a></Typography.Text>
                    {form.topicId ? <Typography.Text><a href={`https://explorer.kabuto.sh/testnet/id/${form.topicId}`}>Hedera
                      Hashgraph</a></Typography.Text> : null}
                  </div>
                  <div>
                  </div>
                  <div className="ux-my-forms__list-item-buttons">
                    {
                      form.reviewer ?
                        <>
                          <Tag color={form.status === "IN_PROGRESS" ? "volcano" : "green"} style={{marginRight: "16px", height: "22px"}}>
                            {form.status}
                          </Tag>
                          <Button type="primary"
                                  onClick={() => this.setState({modalShareVisible: true, chosenFormId: form.id})}
                          >
                            Share
                          </Button>
                        </> :
                        <>
                          <Button type="dashed"
                                  style={{marginRight: "16px"}}
                                  onClick={() => this.setState({modalVisible: true, chosenFormId: form.id})}
                          >
                            Send to review
                          </Button>
                          <Button type="primary"
                                  onClick={() => this.setState({modalShareVisible: true, chosenFormId: form.id})}
                          >
                            Share
                          </Button>
                        </>
                    }
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  const {myForms} = state.myForms;
  const {users} = state.user;
  return {myForms, users};
}

export default connect(mapStateToProps)(MyForms);
