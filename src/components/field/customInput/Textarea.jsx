import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="input__boxx my-3">
        <label>{label}</label>
        <TextArea
          showCount
          maxLength={100}
          style={{
            height: 120,
            marginBottom: 24,
          }}
          {...field}
          {...props}
        />
      </div>
    </>
  );
};

export default CustomInput;
