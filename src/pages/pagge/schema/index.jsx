import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("required"),
  description: Yup.string().required("required"),
  slug: Yup.string().required("required"),
});
