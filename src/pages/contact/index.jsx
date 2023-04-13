// antd
import { Button, Table, Switch, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "lodash";
import axios from "axios";
import Modal from "pages/post/components/modal";
import { useSelector } from "react-redux";

const index = () => {
  const queryClient = useQueryClient();

  // token
  const { token } = useSelector((state) => get(state, "auth"));
  // modal
  const [isOpen, setIsOpen] = useState({
    window: false,
    file: null,
  });

  // table switch

  // delete
  const { mutate: deleteHandler } = useMutation({
    mutationFn: (id) => {
      axios.delete(`http://api.test.uz/api/v1/admin/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "post" });
    },
  });

  //   get
  const fetchPost = () => {
    return axios.get("http://api.test.uz/api/v1/admin/posts?_l=uz", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPost,
  });
  console.log(get(data, "data.data", "errrorrrrr"));

  // data headerColumns
  const tableHead = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "content",
      dataIndex: "content",
    },
    {
      key: "5",
      title: "status",
      dataIndex: "status",
      render: () => {
        return (
          <>
            <Switch defaultChecked onChange={onChange} />
          </>
        );
      },
    },
    {
      key: "6",
      title: "actions",
      dataIndex: "actions",
      render: (value, row) => {
        return (
          <>
            <div className=" flex gap-4">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="link"
                  onClick={() => {
                    deleteHandler(get(row, "id"));
                    queryClient.invalidateQueries({ queryKey: "post" });
                  }}
                  style={{
                    backgroundColor: "red",
                  }}
                  icon={<DeleteOutlined style={{ color: "white" }} />}
                ></Button>
              </Popconfirm>

              <Button
                style={{
                  backgroundColor: "orange",
                }}
                icon={<EditOutlined style={{ color: "black" }} />}
              ></Button>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className=" p-4">
      <h2 className=" text-center my-2">Post</h2>
      <div className="add__btn-box text-right">
        <Button className="m-3" type="primary" onClick={() => setIsOpen(true)}>
          +Add
        </Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen()}></Modal>

      <Table
        columns={tableHead}
        dataSource={get(data, "data.data")}
        loading={isLoading}
      />
    </div>
  );
};

export default index;
