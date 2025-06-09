import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateDonationMutation } from "../api/donateApi";
import { Donation } from "../types/donate-pet-type";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { donationSchema } from "../validations/donationform-validations";
import { toast } from "sonner";
import { SHOW_DONATE_PET_REQUEST } from "@/routes/routes-constant";

// Type for form data
interface DonationFormData {
  email: string;
  phone_no: string;
  address: string;
  expected_donate_date: string;
}

const DonationForm: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<DonationFormData>({
    resolver: yupResolver(donationSchema),
    defaultValues: {
      expected_donate_date: new Date().toISOString().split('T')[0]
    }
  });
  
  const [createDonation] = useCreateDonationMutation();
  
  // Fetch user ID from localStorage
  const userId = localStorage.getItem("user_id");
  
  const onSubmit = async (formData: DonationFormData) => {
    try {
      // Convert form data to Donation type
      const donationData: {
        pet_id: number;
        donate_pet: Donation;
      } = {
        pet_id: Number(petId),
        donate_pet: {
          pet_id: Number(petId),
          email: formData.email,
          phone_no: formData.phone_no,
          address: formData.address,
          expected_donate_date: formData.expected_donate_date,
          actual_donate_date: formData.expected_donate_date,
          user_id: userId ? parseInt(userId) : null,
        },
      };
      
      await createDonation(donationData).unwrap();
      
      // Show success toast
      toast.success("Donation submitted successfully!", {
        description: "Thank you for your contribution.",
        duration: 3000,
      });
      
      // Redirect to show_donation page
      setTimeout(() => {
        navigate(SHOW_DONATE_PET_REQUEST);
      }, 1000);
    } catch (error) {
      console.error("Failed to submit donation", error);
      
      // Show error toast
      toast.error("Failed to submit donation", {
        description: "Please try again later.",
        duration: 5000,
      });
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Make a Donation</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              {...register("email")} 
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone_no">Phone Number</Label>
            <Input 
              id="phone_no" 
              type="tel" 
              {...register("phone_no")} 
              className={errors.phone_no ? "border-red-500" : ""}
            />
            {errors.phone_no && (
              <p className="text-red-500 text-sm">{errors.phone_no.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              {...register("address")} 
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expected_donate_date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Expected Donation Date
            </Label>
            <Input 
              id="expected_donate_date" 
              type="date" 
              {...register("expected_donate_date")} 
              className={errors.expected_donate_date ? "border-red-500" : ""}
            />
            {errors.expected_donate_date && (
              <p className="text-red-500 text-sm">{errors.expected_donate_date.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Donation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DonationForm;