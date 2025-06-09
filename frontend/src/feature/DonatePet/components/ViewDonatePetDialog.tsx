import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { DonationRequest } from "../types/show-donation-request-type";
import { useState } from "react";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  request: DonationRequest | null;
}

const BASE_URL = "http://localhost:3000";

const ViewAdoptPetDialog = ({ isOpen, onClose, request }: DonationDialogProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!request) return null;
  
  const handleNextImage = () => {
    if (request.pet.pet_images && request.pet.pet_images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % request.pet.pet_images.length);
    }
  };

  const handlePrevImage = () => {
    if (request.pet.pet_images && request.pet.pet_images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + request.pet.pet_images.length) % request.pet.pet_images.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="p-4 bg-[#E4D3E7] max-w-4xl w-full mx-auto rounded-xl shadow-lg overflow-y-auto max-h-[90vh]"
        style={{ borderColor: '#A864AF' }}
      >
        <DialogHeader className="relative mb-2">
          <DialogTitle className="text-[#8A5691] text-2xl font-bold">Adoption Request Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {request.pet.pet_images && request.pet.pet_images.length > 0 ? (
              <div className="relative">
                <div className="w-full h-48 md:h-52 rounded-lg overflow-hidden relative">
                  <img
                    src={`${BASE_URL}${request.pet.pet_images[currentImageIndex]}`}
                    alt={`${request.pet.breed_name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {request.pet.pet_images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                      >
                        &#10094;
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2"
                      >
                        &#10095;
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {request.pet.pet_images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${
                          index === currentImageIndex ? 'bg-[#8A5691]' : 'bg-[#D1B0D2]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/50 p-3 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
              </div>
            )}

            {/* User Details - Now in left column */}
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="text-[#8A5691] font-bold mb-2">Contact Information</h3>
              <div className="space-y-1 text-[#8A5691]">
                <div className="flex">
                  <p className="font-semibold w-24">Email:</p>
                  <p className="truncate">{user.email || "No Email Found"}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Phone:</p>
                  <p>{request.phone_no}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Address:</p>
                  <p className="truncate">{request.address}</p>
                </div>
              </div>
            </div>

            {/* Adoption Status - Now in left column */}
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="text-[#8A5691] font-bold mb-2">Adoption Status</h3>
              <div className="space-y-1 text-[#8A5691]">
                <div className="flex">
                  <p className="font-semibold w-24">Status:</p>
                  <p className={
                    request.status === "accepted" ? "text-green-600" : 
                    request.status === "pending" ? "text-yellow-600" : "text-red-600"
                  }>
                    {request.status}
                  </p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Expected:</p>
                  <p>{new Date(request.expected_donate_date).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Actual:</p>
                  <p>{request.actual_donate_date ? new Date(request.actual_donate_date).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pet Information */}
          <div className="space-y-4">
            {/* Pet Details */}
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="text-[#8A5691] font-bold mb-2">Pet Information</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#8A5691]">
                <div className="flex">
                  <p className="font-semibold w-24">Breed:</p>
                  <p>{request.pet.breed_name}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Category:</p>
                  <p>{request.pet.category_name}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Age:</p>
                  <p>{request.pet.age} years</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-24">Gender:</p>
                  <p>{request.pet.gender}</p>
                </div>
              </div>
            </div>

            {/* Additional Pet Details */}
            <div className="bg-white/50 p-3 rounded-lg">
              <h3 className="text-[#8A5691] font-bold mb-2">Additional Information</h3>
              <div className="space-y-2 text-[#8A5691]">
                <div>
                  <p className="font-semibold">Temperament:</p>
                  <p className="text-sm">{request.pet.temperament}</p>
                </div>
                <div>
                  <p className="font-semibold w-24">Vaccination:</p>
                  <p className={request.pet.vaccination_status ? "text-green-600" : "text-red-600"}>
                    {request.pet.vaccination_status ? "Vaccinated" : "Not Vaccinated"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Recommended Food:</p>
                  <p className="text-sm">{request.pet.recommended_food}</p>
                </div>
                <div>
                  <p className="font-semibold">Medical History:</p>
                  <p className="text-sm">{request.pet.medical_history}</p>
                </div>
                <div>
                  <p className="font-semibold">Common Health Issues:</p>
                  <p className="text-sm">{request.pet.common_health_issues}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogClose asChild>
          <button 
            className="mt-4 w-full bg-[#A864AF] text-white p-2 rounded-md hover:bg-[#8A5691] transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAdoptPetDialog;