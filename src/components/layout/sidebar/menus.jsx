import {
  LaptopOutlined,
  UserOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const menus = [
  {
    key: "/",
    icon: <UserOutlined />,
    label: "Home",
  },
  {
    key: "aboutt",
    icon: <LaptopOutlined />,
    label: "About",
    children: [
      {
        key: "about",
        icon: <LaptopOutlined />,
        label: "About",
      },
      {
        key: "users",
        icon: <LaptopOutlined />,
        label: "Users",
      },
      {
        key: "company",
        icon: <LaptopOutlined />,
        label: "Company",
      },
    ],
  },

  {
    key: "banner",
    icon: <UserOutlined />,
    label: "Banner",
  },
  {
    key: "poost",
    icon: <FileDoneOutlined />,
    label: "Post",
  },
  {
    key: "pages",
    icon: <FolderOpenOutlined />,
    label: "Page",
  },
];

export default menus;
