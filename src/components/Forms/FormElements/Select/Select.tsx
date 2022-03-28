/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ISelect } from "./ISelect";
import { SCLabel, SCSelect } from "../styles";
import { Typography } from "../../../General/Typography/Typography";
import { FloatingWrapper } from "../FloatingWrapper/FloatingWrapper";
import { generateRegisterOptions } from "../interfaces/IFormErrors";

export const Select: React.FC<ISelect> = ({
  children,
  formKey,
  register,
  id = formKey,
  defaultValue = "",
  classes = "",
  wrapperClasses = "col-md",
  size = "md",
  multiple = false,
  label,
  disabled = false,
  isValid = true,
  invalidFeedback = "",
  placeholder = "",
  errors = { required: { value: false, message: "" } },
  onChange = (event: any) => undefined,
}: ISelect) => (
  <FloatingWrapper unfloat={multiple || size !== "md"} classes={wrapperClasses}>
    {multiple || size !== "md" ? (
      <SCLabel
        htmlFor={id}
        className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value ? " *" : ""}
      </SCLabel>
    ) : (
      ""
    )}
    <SCSelect
      id={id}
      {...register(
        `${formKey}`,
        generateRegisterOptions(
          errors,
          defaultValue,
          disabled,
          false,
          (event) => onChange(event)
        )
      )}
      multiple={multiple}
      className={[
        "form-select",
        size === "md" ? "" : `form-select-${size}`,
        isValid ? "" : "is-invalid",
        classes,
      ].join(" ")}
      placeholder={placeholder === "" ? label : placeholder}
    >
      <option disabled> </option>
      {children}
    </SCSelect>

    {!multiple && size === "md" ? (
      <SCLabel
        htmlFor={id}
        className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value ? " *" : ""}
      </SCLabel>
    ) : (
      ""
    )}

    {isValid ? (
      ""
    ) : (
      <Typography variant="psmall" classes="invalid-feedback">
        {invalidFeedback}
      </Typography>
    )}
  </FloatingWrapper>
);
