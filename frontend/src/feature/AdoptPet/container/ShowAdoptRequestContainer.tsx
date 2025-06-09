import { useState } from "react";
import { useFetchUserAdoptionsQuery } from "../api/showAdoptRequest";
import { AdoptionRequest } from "../types/show-adopt-request-type";
import ShowAdoptRequest from "../components/ShowAdoptRequest";
import ViewAdoptPetDialog from "../components/ViewAdoptPetDialog";

const ShowAdoptRequestContainer = () => {
  const { data, error, isLoading } = useFetchUserAdoptionsQuery();
  const [selectedRequest, setSelectedRequest] = useState<AdoptionRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleView = (request: AdoptionRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = "status" in error ? (error.data as any)?.message : "Something went wrong";
    return <p className="text-red-500">{errorMessage}</p>;
  }

  // Extract adoption requests from the response
  const adoptionRequests: AdoptionRequest[] = data?.data || [];

  return (
    <>
      <ShowAdoptRequest data={adoptionRequests} onView={handleView}/>
      {selectedRequest && (
        <ViewAdoptPetDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} request={selectedRequest} />
      )}
    </>
  );
};

export default ShowAdoptRequestContainer;
