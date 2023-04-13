import { Input } from "antd";
import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="input__boxx my-3">
        <label>{label}</label>
        <Input
          autoComplete="off"
          {...props}
          {...field}
          className={meta.error && meta.touched ? "input_error" : "input"}
        />
        {meta.error && meta.touched && (
          <p className="error__down">{meta.error}</p>
        )}
      </div>
    </>
  );
};

export default CustomInput;
