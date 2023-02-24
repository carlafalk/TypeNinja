import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);
export const RegistrationValidation = yup.object({
  username: yup
    .string()
    .min(2)
    .max(15, "username can not contain more than 15 characters")
    .required(),
  password: yup
    .string()
    .password()
    .minNumbers(1, "password must contain atleast 1 digit")
    .min(6, "password must contain atleast 6 characters")
    .minUppercase(0)
    .minSymbols(0)
    .required("password is required"),
  email: yup.string().email().required(),
});
