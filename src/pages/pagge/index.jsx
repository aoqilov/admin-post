//
import { Button, Modal, Popconfirm, Switch, Table, message } from "antd";
import UseGet from "crud/useGet";
import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { Field, Form, Formik } from "formik";
import { Fields } from "components";
import usePost from "crud/usePost/usePost";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseDelete from "crud/useDelete/UseDelete";
import UsePut from "crud/UsePut/UsePut";
import Container from "module/container";

// function

const index = () => {
  // DELETE
  const { mutate: deletePage } = UseDelete({
    url: "/pages",
    queryKeyName: ["pages"],
    onSuccess: () => {
      message.destroy("delete");
    },
  });

  const navigate = useNavigate();

  const [pageSizee, setPageSizee] = useState(1);
  return (
    <div>
      <h2 className=" text-center">pages</h2>
      <Button
        className="bg-green-800 m-3 text-white w-[150px] "
        onClick={() => navigate("/pages/create")}
      >
        create
      </Button>
      <Container
        url={"/pages"}
        queryKeyName={"pages"}
        params={{
          limit: 10,
          page: pageSizee,
          extra: { _l: "uz" },
        }}
      >
        {({ items, isLoading, meta }) => {
          return (
            <>
              <div className=" text-center m-5">
                <Table
                  rowKey={"id"}
                  className="mt-3 "
                  dataSource={items}
                  loading={isLoading}
                  pagination={{
                    total: get(meta, "total"),
                    pageSize: get(meta, "perPage"),
                    current: pageSizee,
                    onChange: (e) => setPageSizee(e),
                  }}
                  columns={[
                    {
                      key: "1",
                      title: "ID",
                      dataIndex: "id",
                      width: "5%",
                    },
                    {
                      key: "2",
                      title: "Title",
                      dataIndex: "title",
                      width: "20%",
                    },
                    {
                      key: "3",
                      title: "Slug",
                      dataIndex: "slug",
                      width: "30%",
                    },
                    {
                      key: "4",
                      title: "Description",
                      dataIndex: "description",
                      width: "30%",
                    },
                    {
                      key: "5",
                      title: "Status",
                      dataIndex: "status",
                      width: "10%",
                      render: (value, row) => {
                        return (
                          <Switch
                            // loading={statusLoading}
                            checked={value ? true : false}
                            onChange={(e) =>
                              statusHandler({
                                id: get(row, "id"),
                                status: e ? 1 : 0,
                              })
                            }
                          />
                        );
                      },
                    },
                    {
                      key: "6",
                      title: "Actions",
                      width: "10%",
                      render: (value, row) => {
                        return (
                          <div className="flex gap-4">
                            <Popconfirm
                              placement="leftBottom"
                              title="Are you sure to delete this task?"
                              description="Delete the task"
                              onConfirm={() => deletePage(get(row, "id"))}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                className="bg-red-600 text-white"
                                type="link"
                                icon={<DeleteOutlined />}
                              ></Button>
                            </Popconfirm>
                            <Button
                              className="bg-orange-600 text-white"
                              type="link"
                              icon={<EditOutlined />}
                              onClick={() => {
                                navigate(`/pages/update/${get(row, "id")}`);
                              }}
                            ></Button>
                          </div>
                        );
                      },
                    },
                  ]}
                ></Table>
              </div>
            </>
          );
        }}
      </Container>
    </div>
  );
};

export default index;
