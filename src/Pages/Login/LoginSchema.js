import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Email is wrong").required("E-mail is required"),
  password: Yup.string().max(20, "Maximum 20 characters").required("Password is required"),
});
