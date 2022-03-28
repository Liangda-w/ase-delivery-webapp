import React from "react";
import { IInput } from "./IInput";
import { SCLabel, SCInput } from "../styles";
import { Typography } from "../../../General/Typography/Typography";
import { FloatingWrapper } from "../FloatingWrapper/FloatingWrapper";
import { generateRegisterOptions } from "../interfaces/IFormErrors";

export const Input: React.FC<IInput> = ({
  classes = "",
  wrapperClasses = "col-md",
  label,
  type,
  register,
  defaultValue = undefined,
  formKey,
  id = formKey,
  isValid = true,
  disabled = false,
  invalidFeedback = "Please check your input.",
  placeholder = "",
  errors = { required: { value: false, message: "" } },
  ...props
}: IInput) => (
  <FloatingWrapper classes={wrapperClasses}>
    <SCInput
      {...register(
        `${formKey}`,
        generateRegisterOptions(errors, defaultValue, disabled, undefined)
      )}
      id={id}
      type={type}
      className={[classes, "form-control", isValid ? "" : "is-invalid"].join(
        " "
      )}
      placeholder={placeholder === "" ? label : placeholder}
      {...props}
    />
    <SCLabel htmlFor={id} className={[isValid ? "" : "is-invalid"].join(" ")}>
      {label}
      {errors?.required?.value ? " *" : ""}
    </SCLabel>

    {isValid ? (
      ""
    ) : (
      <Typography variant="psmall" classes="invalid-feedback">
        {invalidFeedback}
      </Typography>
    )}
  </FloatingWrapper>
);
