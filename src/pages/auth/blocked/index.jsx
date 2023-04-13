import React from "react";
import "pages/auth/blocked/blocked.scss";
import { Form, Formik } from "formik";
import CustomInput from "components/field/customInput/customHook";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => get(state, "auth"));
  // check block
  const checkPhone = (values, resetForm) => {
    if (data.phone === values.password) {
      return navigate("/");
    } else {
      resetForm();
    }
  };
  return (
    <div className="block">
      <div className="blocked__form">
        <h2>blocked from</h2>
        <div className="block__form-box">
          <Formik
            initialValues={{
              password: "",
            }}
          >
            {({ values, resetForm }) => {
              return (
                <Form>
                  <CustomInput
                    label={"enter password:"}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="enter your password"
                  />
                  <div className="btn__box">
                    <Button
                      onClick={() => checkPhone(values, resetForm)}
                      type="primary"
                      className=" text-right"
                    >
                      submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default index;
