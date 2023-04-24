import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch, message, notification } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { get, truncate } from "lodash";
import { useState } from "react";
import UsePost from "crud/usePost/usePost";
const modal = ({ isOpen, setIsOpen }) => {
  // post
  const { mutate: postMutation } = UsePost({
    url: `${
      get(isOpen, "file") ? `posts/${get(isOpen, "file.id")}` : "/posts"
    }`,
    queryKeyName: ["post"],
    method: get(isOpen, "file") ? "put" : "post",
    params: {
      extra: { _l: "uz" },
    },
    onSuccess: (data) => {
      api.success({
        message: "success",
        description: "posted",
      });
      setIsOpen({
        window: false,
        file: null,
      });
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("required"),
    description: Yup.string().required("required"),
    content: Yup.string().required("required"),
  });

  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      {contextHolder}
      <Modal
        key={get(isOpen, "file.id")}
        title={isOpen.file ? "Update" : "Create"}
        open={isOpen.window}
        onCancel={() => setIsOpen({ window: false, file: null })}
        footer={false}
      >
        <Formik
          initialValues={{
            title: get(isOpen, "file.title"),
            description: get(isOpen, "file.description"),
            content: get(isOpen, "file.content"),
            status: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            postMutation({ values, resetForm });
          }}
        >
          {({ handleSubmit }) => {
            return (
              <Form>
                <Fields.CustomInput name="title" label="title" />
                <Fields.CustomInput name="description" label="description" />
                <Fields.TextAreaHook name="content" label="content" />
                <Field
                  name="status"
                  label="status"
                  component={Fields.SwitchCustom}
                />

                <div className="form__btn text-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => handleSubmit}
                  >
                    submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
export default modal;
