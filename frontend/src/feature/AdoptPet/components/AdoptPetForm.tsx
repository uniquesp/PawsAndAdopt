import { useState } from "react";
import { toast } from 'sonner';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdoptPetFormData } from "../types/adoptpet-type";
import {AdoptionValidationSchema } from "../validations/adoptpet-validations";
import { AdoptionFormErrors } from "../types/adoptform-validation-type";


interface AdoptPetFormProps {
  formData: AdoptPetFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onClose: () => void;
}

const AdoptPetForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isLoading, 
  onClose 
}: AdoptPetFormProps) => {
  const [errors, setErrors] = useState<AdoptionFormErrors>({});

  const validateForm = async () => {
    try {
      // Clear previous errors
      setErrors({});

      // Validate the entire form data
      await AdoptionValidationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        // Convert Yup errors to our error format
        const errorMap: AdoptionFormErrors = {};
        validationError.inner.forEach((err) => {
          if (err.path) {
            errorMap[err.path as keyof AdoptionFormErrors] = err.message;
          }
        });
        
        // Set errors
        setErrors(errorMap);
      }
      return false;
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    
    if (isValid) {
      handleSubmit(e);
      toast.success('Adoption Request Submitted', {
        description: "We'll review your application soon!",
      });
    } else {
      toast.error('Form Validation Error', {
        description: "Please correct the highlighted fields.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="
          bg-[#FFFEFE] 
          p-8 
          rounded-2xl 
          shadow-2xl 
          w-[500px] 
          relative 
          z-60 
          border-4 
          border-[#A864AF]
        "
      >
        <h2 
          className="
            text-2xl 
            font-bold 
            mb-6 
            text-center 
            text-[#8A5691] 
            border-b-2 
            border-[#D1B0D2] 
            pb-3
          "
        >
          Adopt a Loving Pet
        </h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label 
              className="
                block 
                text-[#8A5691] 
                font-semibold 
                mb-1
                flex items-center
              "
            >
              Email 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`
                border-[#A864AF] 
                focus:ring-2 
                focus:ring-[#8A5691] 
                focus:border-transparent
                ${errors.email ? 'border-red-500' : ''}
              `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              className="
                block 
                text-[#8A5691] 
                font-semibold 
                mb-1
                flex items-center
              "
            >
              Phone No 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              name="phone_no" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={formData.phone_no} 
              onChange={handleChange} 
              className={`
                border-[#A864AF] 
                focus:ring-2 
                focus:ring-[#8A5691] 
                focus:border-transparent
                ${errors.phone_no ? 'border-red-500' : ''}
              `}
            />
            {errors.phone_no && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_no}</p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              className="
                block 
                text-[#8A5691] 
                font-semibold 
                mb-1
                flex items-center
              "
            >
              Address 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              name="address" 
              type="text" 
              placeholder="Enter your address" 
              value={formData.address} 
              onChange={handleChange} 
              className={`
                border-[#A864AF] 
                focus:ring-2 
                focus:ring-[#8A5691] 
                focus:border-transparent
                ${errors.address ? 'border-red-500' : ''}
              `}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              className="
                block 
                text-[#8A5691] 
                font-semibold 
                mb-1
                flex items-center
              "
            >
              Expected Adoption Date 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input 
              name="expected_adoption_date" 
              type="date" 
              value={formData.expected_adoption_date} 
              onChange={handleChange} 
              className={`
                border-[#A864AF] 
                focus:ring-2 
                focus:ring-[#8A5691] 
                focus:border-transparent
                ${errors.expected_adoption_date ? 'border-red-500' : ''}
              `}
            />
            {errors.expected_adoption_date && (
              <p className="text-red-500 text-sm mt-1">{errors.expected_adoption_date}</p>
            )}
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <Button 
              type="button" 
              className="
                w-full 
                bg-[#D1B0D2] 
                text-[#8A5691] 
                hover:bg-[#A864AF] 
                hover:text-white 
                transition-colors
              " 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="
                w-full 
                bg-[#8A5691] 
                text-white 
                hover:bg-[#A864AF] 
                transition-colors
              " 
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Adoption"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptPetForm;