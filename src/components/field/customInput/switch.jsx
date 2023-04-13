import { Switch } from "antd";
import { useField } from "formik";

const switchRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(field);

  return (
    <>
      <label>{label}</label>
      <br />
      <Switch {...props} />
    </>
  );
};
export default switchRadio;
