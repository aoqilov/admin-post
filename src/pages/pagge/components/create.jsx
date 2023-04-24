import { Button, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { Field, Form, Formik } from "formik";
import { Fields } from "components";
import usePost from "crud/usePost/usePost";
import { validationSchema } from "pages/pagge/schema/index";

const create = () => {
  const navigate = useNavigate();

  //  post
  const { mutate: postPage } = usePost({
    url: `${get(open, "file") ? `pages/${get(open, "file.id")}` : "pages"}`,
    queryKeyName: ["pages"],
    method: get(open, "file") ? "put" : "post",
    params: {
      extra: { _l: "uz" },
    },
    onSuccess: () => {
      navigate("/pages");
      message.success("posted");
    },
  });

  return (
    <div className="p-3  bg-[#cdcdcd] h-[100vh]">
      <div className="router btn">
        <Button onClick={() => navigate(-1)} type="primary">
          Orqaga
        </Button>
      </div>
      <h2 className="text-center text-4xl capitalize">create pages</h2>
      <div className="modal__box ">
        <Formik
          initialValues={{
            title: get(open, "file.title"),
            description: get(open, "file.description"),
            slug: get(open, "file.slug"),
            status: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            return postPage({ values, resetForm });
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form className="w-[50%] mx-auto p-5 bg-white">
                <Fields.CustomInput name="title" label={"title"} />
                <Fields.CustomInput name="description" label={"description"} />
                <Fields.TextAreaHook name="slug" label={"slug"} />
                <Field
                  name="status"
                  label="status"
                  component={Fields.SwitchCustom}
                />
                <div className="modal__btn text-right">
                  <Button
                    htmlType="submit"
                    type="primary"
                    onClick={() => {
                      handleSubmit;
                    }}
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

export default create;
