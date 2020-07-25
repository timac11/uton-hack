import React from "react";
import {Table, Tag, Typography} from "antd";
import {connect} from "react-redux";

const {Title} = Typography;

const columns = [
  {
    title: 'Form Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a href={record.link}>{text}</a>,
  },
  {
    title: 'Reviewer',
    dataIndex: 'reviewer',
    key: 'reviewer',
    render: (reviewer) => reviewer ? reviewer.email : "-"
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return (
        <Tag color={status === "IN_PROGRESS" ? "volcano" : "green"}>
          {status}
        </Tag>
      )
    }
  },
  {
    title: 'Hedera Link',
    dataIndex: 'topicId',
    key: "topicId",
    render: (topicId) => topicId ? <Typography.Text><a href={`https://explorer.kabuto.sh/testnet/id/${topicId}`}>Link</a></Typography.Text> : "-"
  }
];

const Shares = (props) => {
  const data = props.shares;
  return (
    <>
      <Title className="gr-ux-user-page__form-creation-title" level={2}>Shared me</Title>
      <div style={{overflow: "scroll"}}>
        <Table columns={columns} dataSource={data}/>
      </div>
    </>
  )
};

function mapStateToProps(state) {
  const {shares} = state.shares;
  return {shares};
}

export default connect(mapStateToProps)(Shares);
