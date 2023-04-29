// antd
import {
  Button,
  Table,
  Switch,
  Popconfirm,
  Tooltip,
  notification,
  Popover,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, truncate } from "lodash";
import axios from "axios";
import Modal from "pages/post/components/modal";
import { useSelector } from "react-redux";
import UseDelete from "crud/useDelete/UseDelete";
import UseGet from "crud/useGet";
import UsePut from "crud/UsePut/UsePut";
import GetAll from "module/container/all";

const index = () => {
  const queryClient = useQueryClient();

  // token
  const { token } = useSelector((state) => get(state, "auth"));
  // ///////////////////////////////////////---------------------- modal[OPEN]
  const [isOpen, setIsOpen] = useState({
    window: false,
    file: null,
  });

  // ////////---  DELETE

  const { mutate: deleteHandler } = UseDelete({
    url: "/posts",
    queryKeyName: ["post"],
    onSuccess: () => {
      message.info("delete");
    },
  });

  // ----  GET
  const { data, isLoading } = UseGet({
    // queryKeyName: ["post"],
    // url: "/posts",
    // params: {
    //   extra: {
    //     _l: "uz",
    //   },
    // },
    // onSuccess: (data) => {},
  });

  // /////////-------------------  PUT-(SWITCH)
  const { mutate: statusHandler, isLoading: statusLoading } = UsePut({
    url: "posts/updateStatus",
    queryKeyName: ["post"],
    params: {
      extra: { _l: "uz" },
    },
    onSuccess: () => {},
  });

  // mutationFn: ({ id, status }) => {
  //   console.log(status);
  //   return axios.put(
  //     `http://api.test.uz/api/v1/admin/posts/updateStatus/${id}?_l=uz`,
  //     { status },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //   );
  // },
  // onSuccess: () => {
  //   message.success("success");
  //   return queryClient.invalidateQueries({ queryKey: ["post"] });
  // },

  return (
    <div className=" p-4">
      {/* {contextHolder} */}
      <h2 className=" text-center my-2">Post</h2>
      <div className="add__btn-box text-right">
        <Button
          className="m-3"
          type="primary"
          onClick={() => setIsOpen({ window: true })}
        >
          +Add
        </Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
      <GetAll
        url={"/posts"}
        queryKeyName={["post"]}
        params={{ extra: { _l: "uz" } }}
        onSuccess={(baza) => {
          console.log(baza);
        }}
      >
        {({ items, data }) => {
          console.log(items);
        }}
      </GetAll>
      <Table
        rowKey={"id"}
        columns={[
          {
            key: "1",
            title: "id",
            dataIndex: "id",
            width: "5%",
          },
          {
            key: "2",
            title: "title",
            dataIndex: "title",
            width: "15%",
          },
          {
            key: "3",
            title: "description",
            dataIndex: "description",
            width: "15%",
          },
          {
            key: "4",
            title: "Content",
            dataIndex: "content",
            width: "40%",
            render: (value) => {
              return value.length > 50 ? (
                <Popover title={value}>
                  {truncate(value, { length: 50, omission: "..." })}
                </Popover>
              ) : (
                value
              );
            },
          },
          {
            key: "5",
            title: "status",
            dataIndex: "status",
            width: "10%",
            className: " text-center",
            render: (value, row) => {
              return (
                <Switch
                  loading={statusLoading}
                  checked={value ? true : false}
                  onChange={(e) =>
                    statusHandler({ id: get(row, "id"), status: e ? 1 : 0 })
                  }
                />
              );
            },
          },
          {
            key: "6",
            title: "actions",
            dataIndex: "actions",
            width: "20%",
            render: (value, row) => {
              return (
                <>
                  <div className=" flex gap-4">
                    <Popconfirm
                      placement="leftBottom"
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        deleteHandler(get(row, "id"));
                      }}
                    >
                      <Tooltip title="click to delete" mouseEnterDelay={0.3}>
                        <Button
                          type="link"
                          style={{
                            backgroundColor: "red",
                          }}
                          icon={<DeleteOutlined style={{ color: "white" }} />}
                        ></Button>
                      </Tooltip>
                    </Popconfirm>
                    <Tooltip title="click to edit" mouseEnterDelay={0.3}>
                      <Button
                        onClick={() => {
                          setIsOpen({
                            window: true,
                            file: row,
                          });
                        }}
                        style={{
                          backgroundColor: "orange",
                        }}
                        icon={<EditOutlined style={{ color: "black" }} />}
                      ></Button>
                    </Tooltip>
                  </div>
                </>
              );
            },
          },
        ]}
        dataSource={items}
        loading={isLoading}
      />
    </div>
  );
};

export default index;
