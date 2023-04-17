import { Input } from "antd";
const { TextArea } = Input;
import { useField } from "formik";
import React from "react";
import "assets/style/components/field/customInput.scss";

const TextAreaHook = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="input__boxx my-3">
        <label>{label}</label>
        <TextArea
          {...field}
          {...props}
          style={{
            height: 120,
            marginBottom: 24,
          }}
          className={meta.error && meta.touched ? "input_error" : "input"}
        />
        {meta.error && meta.touched && (
          <p className="error__down">{meta.error}</p>
        )}
      </div>
    </>
  );
};

export default TextAreaHook;
