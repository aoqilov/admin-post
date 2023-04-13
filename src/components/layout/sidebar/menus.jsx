import {
  LaptopOutlined,
  UserOutlined,
  FileDoneOutlined,
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
    key: "contact",
    icon: <UserOutlined />,
    label: "Contact",
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
];

export default menus;
