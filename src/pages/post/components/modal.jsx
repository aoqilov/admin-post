import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch, notification } from "antd";
import axios from "axios";
import CustomInput from "components/field/customInput/CustomHook";
import Textarea from "components/field/customInput/Textarea";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

const modal = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  // token
  const { token } = useSelector((state) => get(state, "auth"));

  // post
  const mutation = useMutation({
    mutationFn: (value) => {
      return axios.post("http://api.test.uz/api/v1/admin/posts?_l=uz", value, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "post" });
      api.success({
        message: `Succes`,
        description: "all ready",
      });
      setIsOpen({
        window: false,
      });
    },
    onError: () => {
      api.success({
        message: `Error`,
        description: "error",
      });
    },
  });

  const [api, contextHolder] = notification.useNotification();
  return (
    <>
      {contextHolder}
      <Modal
        title={isOpen.file ? "update" : "create"}
        open={isOpen.window}
        onCancel={() => setIsOpen({ window: false })}
        footer={false}
      >
        <Formik
          initialValues={{
            title: get(isOpen, "file", ""),
            description: get(isOpen, "file", ""),
            content: get(isOpen, "file", ""),
          }}
        >
          {({ values }) => {
            console.log("-------------");
            console.log(values);
            return (
              <Form>
                <CustomInput name="title" label="title" />
                <CustomInput name="description" label="description" />
                <Textarea name="content" label={"content"} />
                <Field name="status">
                  {({ field }) => {
                    return (
                      <>
                        <label>status</label>
                        <br />
                        <Switch
                          {...field}
                          checked={values.status}
                          onChange={(value) => {
                            field.onChange({
                              target: {
                                name: field.name,
                                value: value,
                              },
                            });
                          }}
                        />
                      </>
                    );
                  }}
                </Field>
                <div className="form__btn text-right">
                  <Button
                    type="primary"
                    onClick={() => mutation.mutate(values)}
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
