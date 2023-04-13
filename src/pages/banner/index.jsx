import { Button, Modal, Table, notification } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form, Formik } from "formik";
import CustomInput from "./form/CustomInput";
import { useSelector } from "react-redux";
import { get } from "lodash";
const index = () => {
  // query client
  const queryClient = useQueryClient();
  // token
  const { token } = useSelector((state) => get(state, "auth"));
  // headtitle
  const headul = [
    {
      key: "1",
      title: "№ id",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "name",
      dataIndex: "name_uz",
    },
    {
      key: "3",
      title: "description",
      dataIndex: "description_uz",
    },
    {
      key: "4",
      title: "actions",
      dataIndex: "actions",
      render: (value, row) => {
        console.log(get(row, "id"));
        return (
          <div className=" flex gap-4">
            <Button
              onClick={() => {
                deleteHandler(get(row, "id"));
              }}
              style={{
                backgroundColor: "red",
              }}
              icon={<DeleteOutlined style={{ color: "white" }} />}
            ></Button>
            <Button
              onClick={() =>
                setOpen({
                  window: true,
                  editData: row,
                })
              }
              style={{
                backgroundColor: "orange",
              }}
              icon={<EditOutlined style={{ color: "black" }} />}
            ></Button>
          </div>
        );
      },
    },
  ];

  // delete
  const { mutate: deleteHandler } = useMutation({
    mutationFn: (id) => {
      axios.delete(`http://api.test.uz/api/v1/admin/post/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "post" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // notification
  const [api, contextHolder] = notification.useNotification();

  // modal
  const [open, setOpen] = useState({
    window: false,
    editData: null,
  });

  // post
  const mutation = useMutation({
    mutationFn: (value) => {
      return axios.post(`http://api.test.uz/api/v1/admin/banners`, value, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: (value) => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      setOpen(false);
      api.success({
        message: "Your post is saved",
        description: `${value.response.data.message}`,
      });
    },
    onError: (error) => {
      api.error({
        message: "Error",
        description: `${error.response.data.message}`,
      });
    },
  });

  // get

  const fetchBanner = () => {
    return axios.get("http://api.test.uz/api/v1/admin/banners", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: fetchBanner,
  });

  console.log(get(data, "data.data"));
  return (
    <div className="overflow-y-auto px-2">
      <h2 className=" text-center my-2">banner page</h2>
      <div className="add__box text-right">
        {contextHolder}
        <Button
          type="primary"
          className=""
          onClick={() => setOpen({ window: true })}
        >
          +ADD
        </Button>
      </div>
      <Modal
        title="form post"
        open={open.window}
        footer={false}
        onCancel={() =>
          setOpen({
            window: false,
          })
        }
      >
        <Formik
          initialValues={{
            name_uz: get(open, "editData.name_uz", ""),
            description_uz: get(open, "editData.description_uz", ""),
          }}
        >
          {({ values, resetForm }) => {
            return (
              <Form>
                <CustomInput
                  label={"enter name:"}
                  type="text"
                  name="name_uz"
                  placeholder="enter your name"
                />
                <CustomInput
                  label={"enter description_uz:"}
                  type="text"
                  name="description_uz"
                  placeholder="enter description"
                />
                <div className="btn__box">
                  <Button onClick={() => setOpen({ window: false })}>
                    cancel
                  </Button>
                  <Button onClick={() => mutation.mutate(values)}>
                    submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      <Table
        columns={headul}
        dataSource={get(data, "data.data")}
        loading={isLoading}
      />
    </div>
  );
};

export default index;
