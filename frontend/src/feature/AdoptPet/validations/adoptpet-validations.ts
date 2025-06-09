import * as Yup from 'yup';

export const AdoptionValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required*'),
  
  phone_no: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required*'),
  
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required*'),
  
  expected_adoption_date: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Adoption date is required*')
});

