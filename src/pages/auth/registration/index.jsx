import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import { Fields } from "components";
import { signIn } from "store/auth";
import { Button, Spin, notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
  //   console.log(values);
  //   // resetForm();
  // };

  const mutation = useMutation({
    mutationFn: (value) => {
      return axios.post("http://api.test.uz/api/v1/admin/user/register", value);
    },
    onSuccess: (succes) => {
      console.log(succes.data.message);
      api.success({
        message: `Great `,
        description: `${succes.data.message}`,
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      console.log(error);
      api.error({
        message: "Error",
        description: `${error.response.data.message}`,
      });
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      {contextHolder}

      <div className="w-2/4 shadow-md p-10 rounded-md bg-white">
        <h1 className="text-center capitalize text-[#fff]  p-2 bg-blue-300 my-2">
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
          onSubmit={(data) => {
            //
          }}
        >
          {({ values, resetForm }) => {
            return (
              <Form>
                <Field
                  name="username"
                  label="User name"
                  component={Fields.Input}
                />
                <Field
                  name="first_name"
                  label="First name"
                  component={Fields.Input}
                />
                <Field
                  name="last_name"
                  label="Last name"
                  component={Fields.Input}
                />
                <Field name="phone" label="Phone" component={Fields.Input} />
                <Field
                  name="password"
                  label="Password"
                  component={Fields.Input}
                />
                <Button
                  type="primary"
                  onClick={() =>
                    // registerHandler(values, resetForm)
                    mutation.mutate(values, resetForm)
                  }
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default index;
