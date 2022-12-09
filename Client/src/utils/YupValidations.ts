import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);
export const RegistrationValidation = yup.object({
  username: yup.string().min(2).max(15,"username can not contain more than 15 characters").required(),
  password: yup.string().password().minNumbers(1).minUppercase(1).minLowercase(1).minSymbols(1).min(6).required(),
  email: yup.string().email().required()
})