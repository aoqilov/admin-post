import { useMutation } from "@tanstack/react-query";
import { Button, message } from "antd";
import axios from "axios";
import { Fields } from "components";
import usePost from "crud/usePost/usePost";
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

  // const mutation = useMutation({
  //   mutationFn: (value) => {
  //     return axios.post(
  //       "https://api.horunxon.uz/api/v1/admin/user/sign-in",
  //       value
  //     );
  //   },
  //   onSuccess: (baza) => {
  //     storage.set("token", get(baza, "data.data.token"));
  //     dispatch(signIn(get(baza, "data.data")));
  //     navigate("/");
  //
  //   },
  // });

  const { mutate: loginPost } = usePost({
    url: "/user/sign-in",
    method: "post",
    onSuccess: (baza) => {
      storage.set("token", get(baza, "data.data.token"));
      dispatch(signIn(get(baza, "data.data")));
      navigate("/");
    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-950">
      <div className="w-1/2 shadow-md p-10 rounded-md bg-white">
        <h1 className="text-center capitalize text-[#fff]  p-2 bg-sky-950 my-2">
          sig-in
        </h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
            phone: "",
          }}
          onSubmit={(values, { resetForm }) => {
            loginPost({ values, resetForm });
          }}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form>
                <Fields.CustomInput name="username" label="User name" />
                <Fields.CustomInput name="phone" label="Phone" />
                <Fields.CustomInput name="password" label="Password" />
                <div className="text-right gap-4 flex justify-end">
                  <Button
                    className="bg-white text-black"
                    type="primary"
                    onClick={() => navigate("/auth/registration")}
                  >
                    Registration
                  </Button>
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
