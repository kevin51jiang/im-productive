import React from "react";
import { Popconfirm, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const ClearDataButton = () => {
  return (
    <Popconfirm
      title="Are you sure？"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={() => {
        window.localStorage.clear();
        window.location.reload();
      }}
    >
      <Button danger>Clear all data</Button>
    </Popconfirm>
  );
};

export default ClearDataButton;
