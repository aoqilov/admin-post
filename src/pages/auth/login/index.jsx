import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import storage from "services/storage";
import { signIn } from "store/auth";

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (value) => {
      return axios.post("http://api.test.uz/api/v1/admin/user/sign-in", value);
    },
    onSuccess: (data) => {
      storage.set("token", get(data, "data.data.token"));
      dispatch(signIn(get(data, "data.data")));
      navigate("/");
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      <div className="w-1/2 shadow-md p-10 rounded-md bg-white">
        <Formik
          initialValues={{
            username: "",
            password: "",
            phone: "",
            status: 1,
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values }) => {
            return (
              <Form>
                <Field
                  name="username"
                  label="User name"
                  component={Fields.Input}
                />
                <Field name="phone" label="Phone" component={Fields.Input} />

                <Field
                  name="password"
                  label="Password"
                  component={Fields.Input}
                />
                <Button type="primary" onClick={() => mutation.mutate(values)}>
                  Submit
                </Button>
                <Button>
                  <span
                    className="ml-2"
                    onClick={() => navigate("/auth/registration")}
                  >
                    Registration
                  </span>
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
