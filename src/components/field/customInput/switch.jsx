import { Switch } from "antd";
import { useField } from "formik";
import "assets/style/components/field/customInput.scss";

const index = (props) => {
  const {
    label,
    field,
    form: { setFieldValue },
  } = props;

  return (
    <div>
      {label ? <h2 className="text-sm">{label}</h2> : null}
      <Switch
        name={field.name}
        checked={field.value}
        onChange={(e) => setFieldValue(field.name, e ? 1 : 0)}
      />
    </div>
  );
};

export default index;
