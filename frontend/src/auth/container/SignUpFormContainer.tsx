import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "@/auth/api/signUpApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpRequest } from "@/auth/types/signup-type";
import { SignUpFormView } from "../components/SignUpFormView";
import { setUserAfterSignup } from "../authSlice";
import { toast } from "sonner"; //  Import Sonner for toast notifications
import { SignUpValidationSchema } from "../validations/signup-validation";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUpFormContainer: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignUpRequest>({
    resolver: yupResolver(SignUpValidationSchema),
    mode: 'onBlur'
  });
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      const userData = await registerUser(data).unwrap();
      dispatch(setUserAfterSignup(userData));

      //  Show success toast
      toast.success(`Account created successfully! Please sign in.`);

      //  Delay navigation to allow toast visibility
        navigate("/signin"); // Redirect to login page
    } catch (err) {
      console.error("Registration failed:", err);

      //  Show error toast
      toast.error("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <SignUpFormView
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      apiError={error}
    />
  );
};

export default SignUpFormContainer;
