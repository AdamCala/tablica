import * as yup from "yup";

type AuthType = "login" | "sign-up";

export const authFormSchema = (authType: AuthType) => {
  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Email address is required"),

    password: yup
      .string()
      .min(8, "Password needs to contain at least 8 characters")
      .required("Password is required"),
  });

  if (authType === "sign-up") {
    schema = schema.shape({
      name: yup.string().required("Please provide a name"),
    });
  }

  return schema;
};

export interface AuthForm {
  name?: string;
  email: string;
  password: string;
}
