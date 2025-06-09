import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInRequest } from '../types/signin-type';
import { Link } from 'react-router-dom';

interface SignInFormViewProps extends React.ComponentProps<"form"> {
  register: UseFormRegister<SignInRequest>;
  errors: FieldErrors<SignInRequest>;
  isLoading: boolean;
  apiError: any;
}

export const SignInFormView: React.FC<SignInFormViewProps> = ({
  className,
  onSubmit,
  register,
  errors,
  isLoading,
  apiError,
  ...props
}) => {
  return (
  <div className='h-screen w-screen flex justify-center bg-gradient-to-br from-[#E4D3E7] to-[#D1B0D2]'>
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={cn("w-full max-w-5xl", className)}>
        <Card className="overflow-hidden shadow-xl border-[#A864AF]">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={onSubmit} {...props}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-3xl font-bold text-[#8A5691]">Paws&Adopt</h1>
                  <p className="text-balance text-[#8A5691]/70">
                    Sign in to continue
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[#8A5691]">
                      Email 
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="border-[#A864AF] focus:border-[#8A5691] focus:ring-[#8A5691] 
                      bg-[#FFFEFE] text-[#8A5691] placeholder-[#A864AF]/50"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-[#8A5691]">
                      Password 
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      className="border-[#A864AF] focus:border-[#8A5691] focus:ring-[#8A5691] 
                      bg-[#FFFEFE] text-[#8A5691] placeholder-[#A864AF]/50"
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                  </div>
                </div>
                {apiError && <p className="text-red-500 text-center">Login failed: {apiError.message}</p>}
                <Button 
                  type="submit" 
                  className="w-full bg-[#8A5691] hover:bg-[#A864AF] text-[#FFFEFE]" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="text-center text-sm text-[#8A5691]">
                  Don't have an account? {" "}
                  <Link to="/signup" className="text-[#8A5691] underline underline-offset-4 hover:text-[#A864AF]">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-[#E4D3E7] md:block">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/SignUpPets.jpg"
                  alt="Adorable pet"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8A5691]/60 to-[#A864AF]/20"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-balance text-center text-xs text-[#8A5691] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#A864AF]">
          By signing in, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
    </div>
  );
};