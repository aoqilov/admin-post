import { Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useLocation } from "react-router-dom";

const index = () => {
  const location = useLocation();
  const blackList = ["pages/create", "pages/update", "post/update"];
  const aaa = blackList.some((item) => item.startsWith(location.pathname));

  return (
    <Layout className="h-screen overflow-y-hidden">
      {aaa ? null : <Sidebar />}
      <Content />
    </Layout>
  );
};

export default index;
