import * as yup from "yup";

export const validationSignUpSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Fullname should be of minimum 3 characters")
    .required("Fullname is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number",
    )
    .optional(),
});

export const paymentSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Fullname should be of minimum 3 characters")
    .required("Fullname is required"),
  cardNumber: yup
    .string()
    .matches(
      /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/,
      "Invalid card number",
    )
    .required("Required"),
  expiryDate: yup
    .string()
    .matches(/^\d{2}\/\d{2}$/, "Invalid expiry date (MM/YY)")
    .required("Required"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "Invalid CVV")
    .required("Required"),
});
