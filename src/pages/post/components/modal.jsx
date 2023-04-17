import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch, notification } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { get, truncate } from "lodash";
import { useState } from "react";
import UsePost from "crud/usePost/usePost";
const modal = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  // token
  const { token } = useSelector((state) => get(state, "auth"));

  const [isPosted, setIsPosted] = useState(false);
  // post
  const { mutate: postMutation, isSuccess } = UsePost({
    url: "/posts?_l=uz",
    queryKey: "post",
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
          onSubmit={(value, { resetForm }) => {
            postMutation(value);
            if (isSuccess) {
              setIsOpen({ window: false });
              return resetForm();
            }
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
