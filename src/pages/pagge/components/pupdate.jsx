import { Button, message } from "antd";
//
import ContainreOne from "module/container/ContainreOne";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "lodash";
import { Field, Form, Formik } from "formik";
import { Fields } from "components";
import { validationSchema } from "pages/pagge/schema/index";

const pupdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="p-4">
      <Button onClick={() => navigate(-1)}>Orqaga</Button>
      <ContainreOne
        url={`pages/${id}`}
        params={{
          extra: { _l: "uz" },
        }}
        queryKeyName={"pages"}
      >
        {({ items }) => {
          return (
            <Formik
              key={get(items, "id")}
              initialValues={{
                title: get(items, "title"),
                description: get(items, "description"),
                slug: get(items, "slug"),
                status: 1,
              }}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => {
                return (
                  <Form className="w-[50%] mx-auto p-5 bg-white">
                    <Fields.CustomInput name="title" label={"title"} />
                    <Fields.CustomInput
                      name="description"
                      label={"description"}
                    />
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
                          handleSubmit();
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          );
        }}
      </ContainreOne>
    </div>
  );
};

export default pupdate;
