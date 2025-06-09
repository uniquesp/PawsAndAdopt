// petFormValidation.ts
import * as yup from 'yup';
import { Pet } from '../types/donate-pet-type';

// Define maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Define allowed file types
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// Helper to create appropriate error messages
const createRequiredMessage = (fieldName: string) => `${fieldName} is required`;

// Main validation schema aligned exactly with Pet interface
export const petFormSchema = yup.object().shape({
  // Optional id field
  id: yup.number().optional(),
  
  // Age validations
  age: yup
    .number()
    .required(createRequiredMessage('Pet age'))
    .positive('Age must be a positive number')
    .typeError('Age must be a number'),
  
  // Age unit is included in the schema but handled in component state
  age_unit: yup.string().optional(),
  
  // Gender validation
  gender: yup
    .number()
    .required(createRequiredMessage('Pet gender'))
    .oneOf([1, 2], 'Please select a valid gender option'),
  
  // Temperament validation (text only)
  temperament: yup
    .string()
    .required(createRequiredMessage('Temperament'))
    .matches(/^[A-Za-z\s]+$/, 'Temperament must contain only letters and spaces'),
  
  // Vaccination status validation (boolean)
  vaccination_status: yup
    .boolean()
    .optional(),
  
  // Textarea validations
  medical_history: yup
    .string()
    .required(createRequiredMessage('Medical history'))
    .min(10, 'Medical history must be at least 10 characters')
    .max(500, 'Medical history cannot exceed 500 characters'),
  
  recommended_food: yup
    .string()
    .required(createRequiredMessage('Recommended food'))
    .min(10, 'Recommended food must be at least 10 characters')
    .max(500, 'Recommended food cannot exceed 500 characters'),
  
  common_health_issues: yup
    .string()
    .required(createRequiredMessage('Common health issues'))
    .min(10, 'Common health issues must be at least 10 characters')
    .max(500, 'Common health issues cannot exceed 500 characters'),
  
  // Status validation
  status: yup
    .number()
    .required(createRequiredMessage('Availability status'))
    .oneOf([0, 1], 'Please select a valid status option'),
  
  // Optional pet_images field to match interface
  pet_images: yup.array().optional(),
  
  // Category and breed validations
  category_id: yup
    .number()
    .required(createRequiredMessage('Pet category'))
    .positive('Please select a valid category'),
  
  breed_id: yup
    .number()
    .required(createRequiredMessage('Pet breed'))
    .positive('Please select a valid breed'),
}) as yup.ObjectSchema<Pet>;

// Separate validation function for pet images
export const validatePetImages = (images: File[]): string | null => {
  // Check if images are provided
  if (!images || images.length === 0) {
    return 'Please upload at least one pet image';
  }

  // Check maximum number of images
  if (images.length > 5) {
    return 'Maximum 5 images are allowed';
  }

  // Check file types and sizes
  for (const image of images) {
    // Check file type
    if (!SUPPORTED_FORMATS.includes(image.type)) {
      return 'Only JPG, JPEG, and PNG images are allowed';
    }

    // Check file size
    if (image.size > MAX_FILE_SIZE) {
      return 'File size is too large. Maximum size is 5MB';
    }
  }

  return null; // No errors
};

// Type for validation errors
export type PetFormValidationError = {
  message: string;
  field?: string;
};