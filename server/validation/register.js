import validator from "validator";
import isEmpty from "is-empty";

export const validateRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPwd = !isEmpty(data.confirmPwd) ? data.confirmPwd : "";

  if (validator.isEmpty(data.name)) errors.name = "Name field is required";
  if (validator.isEmpty(data.email)) errors.email = "Email field is required";
  if (validator.isEmpty(data.password))
    errors.password = "Password field is required";
  if (!validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be between 6-30 characters";
  if (!validator.equals(data.password, data.confirmPwd))
    errors.confirmPwd = "Passwords must match";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
