import { Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useLocation } from "react-router-dom";

const index = () => {
  const location = useLocation();
  const blacklist = ["/pages/create", "/pages/update"];
  return (
    <Layout className="h-screen overflow-y-hidden">
      {!blacklist.some((item) => item.startsWith(location.pathname)) ? null : (
        <Sidebar />
      )}
      <Content />
    </Layout>
  );
};

export default index;
