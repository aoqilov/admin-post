import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useState } from "react";
import "components/layout/content/content.scss";
const { Content } = Layout;

const index = () => {
  const navigate = useNavigate();
  return (
    <Content className=" overflow-y-auto">
      <div className="navbar px-5 h-12 flex justify-between items-center bg-[#001529]">
        <h2 className="text-white">admin panel</h2>
        <LockOutlined
          onClick={() => {
            return navigate("/blocked");
          }}
          style={{
            fontSize: "20px",
            padding: "5px",
            color: "#001529",
            background: "#F5F5F5",
            borderRadius: "10px",
          }}
        />
      </div>
      <Outlet />
    </Content>
  );
};

export default index;
