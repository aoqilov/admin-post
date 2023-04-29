import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import { Fields } from "components";
import { signIn } from "store/auth";
import { Button, Spin, message, notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import "assets/style/pages/auth/registration.scss";
import usePost from "crud/usePost/usePost";
import storage from "services/storage";

const { VITE_API_ROOT } = import.meta.env;

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  // const registerHandler = (values) => {
  //   axios
  //     .post("http://api.test.uz/api/v1/admin/user/register", values)
  //     .then((data) => {
  //       dispatch(signIn(get(data, "data.data")));
  //       navigate("/");
  //     });
  //   // resetForm();
  // };
  // //////////////////////////////////////////////////
  // const mutation = useMutation({
  //   mutationFn: (value) => {
  //     return axios.post("http://api.test.uz/api/v1/admin/user/register", value);
  //   },
  //   onSuccess: (succes) => {
  //     api.success({
  //       message: `Great `,
  //       description: `${succes.data.message}`,
  //     });
  //   },
  //   onError: (error) => {
  //     api.error({
  //       message: "Error",
  //       description: `${error.response.data.message}`,
  //     });
  //   },
  // });

  const { mutate: register } = usePost({
    url: "/user/register",
    method: "post",
    queryKeyName: ["sign"],
    onSuccess: (succes) => {
      console.log(succes);
      message.success("registration completed");
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
      message.error(error.response.data.message);
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-950">
      {contextHolder}
      <div className="w-2/4 shadow-md p-10 rounded-md bg-white">
        <h1 className="text-center capitalize text-[#fff]  p-2 bg-sky-950 my-2">
          registration
        </h1>
        <Formik
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            phone: "",
            password: "",
            status: 1,
          }}
          onSubmit={(values, { resetForm }) => {
            register({ values, resetForm });
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form>
                <Fields.CustomInput name="username" label="User name" />
                <Fields.CustomInput name="first_name" label="First name" />
                <Fields.CustomInput name="last_name" label="Last name" />
                <Fields.CustomInput name="phone" label="Phone" />
                <Fields.CustomInput name="password" label="Password" />
                <div className="text-right">
                  <Button
                    className="bg-sky-950"
                    type="primary"
                    htmlType="submit"
                    onClick={() => handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default index;
