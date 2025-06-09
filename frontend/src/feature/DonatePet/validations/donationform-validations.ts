// src/validations/donationSchema.ts
import * as yup from "yup";

export const donationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone_no: yup  // Changed from phone_number to match Donation interface
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  expected_donate_date: yup
    .string()  // Changed from date to string to match the interface
    .test('future-date', 'Date must be today or in the future', (value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value ? new Date(value) >= today : false;
    })
    .required("Expected donation date is required"),
});